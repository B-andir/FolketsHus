const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

filmSchema.pre("create", (next) => {
    this.set({showType: "kontrast"});

    next();
});

const FilmModel = mongoose.model("Kontrast", filmSchema, "BioKontrast");

module.exports = FilmModel;