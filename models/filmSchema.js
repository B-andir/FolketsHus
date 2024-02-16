const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    runtime:  {
        type: Number,
        required: true,
    },
    livePauses: {
        type: Number,
    },
    description:  {
        type: String,
        required: true,
    },
    date:  {
        type: Date,
        required: true,
    },
    posterURL:  {
        type: String,
        required: true,
    },
    posterCloudinaryID: {
        type: String,
    },
    trailerURL:  {
        type: String,
    },
    ticketURL:  {
        type: String,
    },
    ageRating:  {
        type: String,
        default: "",
    },
    genre:  {
        type: String,
    },
    premiere:  {
        type: Boolean,
        default: false,
    },
    showType: {
        type: String
    }
});

module.exports = FilmSchema;