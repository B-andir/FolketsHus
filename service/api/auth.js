const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const { scrypt, randomFill, createCipheriv, createDecipheriv} = require('node:crypto');


const Users = require('../../models/userModel.js');
const { AsyncLocalStorage } = require('node:async_hooks');
const { debug } = require('node:console');

require('dotenv').config();

const saltRounds = 10;

async function generateTokens(user, callback) {

    const accessKey = uuidv4();
    const refreshKey = uuidv4();

    await Users.updateOne(user, {
        accessKey: accessKey,
        refreshKey: refreshKey,
        accessKeyCreated: Date.now(),
    })

    const refreshToken = jwt.sign({
        sub: user.pubId,
        key: refreshKey
    }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    const accessToken = jwt.sign({
        sub: user.pubId,
        key: accessKey
    }, process.env.JWT_SECRET, {
        expiresIn: "30s",
    });

    callback(accessToken, refreshToken);
}

function str2ab(str) {
    const array = str.split(",");
    var bufView = new Uint8Array(array.length);

    for (var i = 0; i < array.length; i++) {
        bufView[i] = array[i];
    }

    return bufView;
}

async function refreshAccessToken(refreshToken, res) {
    if (refreshToken) {

        jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res
                    .status(401)
                    .send('Invalid Refresh Token');

                return;
            }

            const user = await Users.findOne({ pubId: decoded.sub });

            if (user) {

                if (user.refreshKey == decoded.key) {

                    await generateTokens(user, (accessKey, refreshKey) => {
                        res
                            .status(200)
                            .json({accessToken: accessKey, refreshToken: refreshKey});

                        return;
                    });

                } else {
                    res
                        .status(401)
                        .send('Invalid Refresh Token');

                    return;
                }

            } else {
                res
                    .status(400)
                    .send("Couldn't find user");

                return;
            }
        })

    } else {
        res
            .status(401)
            .send('Invalid Refresh Token');

        return;
    }
}

async function authorize(userName, password, res) {
    // Get user from database collection Users
    const user = await Users.findOne({ name: userName });

    // If we find the user in the database
    if (user) {

        // Generate the encryption key, using .env values for password and salt, as well as the user salt from the db
        scrypt(process.env.HASH_ENCRYPTION_PASSWORD, user.salt + process.env.HASH_ENCRYPTION_SALT, 24, (err, key) => {
            if (err) {
                console.warn(err);
                res.status(500).send();
            }

            // Retrieve the stored string of the initialization vector from the db, and turn it into a UInt8Array
            const iv = str2ab(user.iv);

            // Create the decipher with the key and the initialization vector
            const decipher = createDecipheriv(process.env.HASH_ENCRYPTION_ALGORITHM, key, iv);
    
            // Use the decipher to decrypt the password
            let decrypted = decipher.update(user.password, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            // Compare the cleartext password to the decrypted hash.
            bcrypt.compare(password, decrypted, (err, result) => {
                if (err) {
                    console.warn(err);
                    res.status(500).send();
                }

                if (result == true) {
                    // If passwords match, generate Refresh and Access token, then send them to client with status 200
                    generateTokens(user, (accessKey, refreshKey) => {
                        res
                            .status(200)
                            .json({accessToken: accessKey, refreshToken: refreshKey});
                    });


                } else {
                    // If passwords match, return Unauthorized
                    console.log("Passwords don't match");
                    res.status(401).send();
                }
            });
        });
    } else {
        // If no user is found, return Unauthorized
        console.log("Couldn't find user");
        res.status(401).send();
    }
}

module.exports = { authorize, refreshAccessToken };
