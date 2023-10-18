const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

const FilmModel = mongoose.model("Film", filmSchema, "Filmer");

module.exports = FilmModel;