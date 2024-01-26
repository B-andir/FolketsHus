const bcrypt = require('bcrypt');
const { scrypt, scryptSync, randomFill, createCipheriv, createDecipheriv, randomBytes} = require('node:crypto');
const {Buffer} = require('node:buffer');


const Users = require('../../models/userModel.js');
const { AsyncLocalStorage } = require('node:async_hooks');

require('dotenv').config();

const saltRounds = 10;

function str2ab(str) {
    const array = str.split(",");
    var bufView = new Uint8Array(array.length);

    for (var i = 0; i < array.length; i++) {
        bufView[i] = array[i];
    }

    return bufView;
}

async function authorize(userName, password) {
    const user = await Users.findOne({ name: userName });

    if (user) {
        console.log("User Found");

        await scrypt(process.env.HASH_ENCRYPTION_PASSWORD, user.salt + process.env.HASH_ENCRYPTION_SALT, 24, (err, key) => {
            if (err) throw err;

            const iv = str2ab(user.iv);

            const decipher = createDecipheriv(process.env.HASH_ENCRYPTION_ALGORITHM, key, iv);
    
            let decrypted = decipher.update(user.password, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
        });
    }
}

module.exports = { authorize };
