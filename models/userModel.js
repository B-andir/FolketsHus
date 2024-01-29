const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const userSchema = new mongoose.Schema({
    pubId: {
        type: String,
        required: true,
        default: nanoid(),
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
    refreshKey: String,
    accessKey: String,
    accessKeyCreated: Date,
});

const UserModel = mongoose.model('User', userSchema, 'Users');

module.exports = UserModel;