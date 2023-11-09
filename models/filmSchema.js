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
    trailerURL:  {
        type: String,
        required: true,
    },
    ticketURL:  {
        type: String,
        required: true,
    },
    ageRating:  {
        type: String,
        required: true,
    },
    genre:  {
        type: String,
        required: true,
    },
    premiere:  {
        type: Boolean,
        required: true,
        default: false,
    },
    expiresAfter: {
        type: Date,
        required: true,
        set: () => { 
            let d = this.date;
            d.setUTCHours(24, 0, 0)
        
            console.log(d);
        },
    }
});

module.exports = FilmSchema;