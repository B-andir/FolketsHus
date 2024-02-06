const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    API: {
        type: String,
        required: true,
    },
    data: {
        type: [],
        required: true,
    },
});

const APIModel = mongoose.model('AppAPIs', apiSchema, 'AppAPIs');

module.exports = APIModel;