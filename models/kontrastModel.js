const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

const FilmModel = mongoose.model("Kontrast", filmSchema, "BioKontrast");

module.exports = FilmModel;