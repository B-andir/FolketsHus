const mongoose = require('mongoose');
const filmSchema = require('./filmSchema')

filmSchema.pre("create", (next) => {
    this.set({showType: "live"});

    next();
});

const FilmModel = mongoose.model("Live", filmSchema, "LiveBio");

module.exports = FilmModel;