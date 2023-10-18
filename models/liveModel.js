const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

const FilmModel = mongoose.model("Live", filmSchema, "LiveBio");

module.exports = FilmModel;