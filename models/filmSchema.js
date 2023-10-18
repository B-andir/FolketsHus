const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    name: String,
    runtime: Number,
    description: String,
    date: Date,
    posterURL: String,
    trailerURL: String,
    ticketURL: String,
    ageRating: String,
    genre: String,
    premiere: Boolean
});

module.exports = FilmSchema;