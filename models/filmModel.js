const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

filmSchema.pre("create", (next) => {
    this.set({showType: "film"});

    next();
});

const FilmModel = mongoose.model("Film", filmSchema, "Filmer");

module.exports = FilmModel;