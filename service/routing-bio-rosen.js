const express = require('express');
const router = express.Router();

const Films = require('../models/filmModel.js');
const Live = require('../models/liveModel.js');
const Kontrast = require('../models/kontrastModel.js');

let filmsCache;

async function fetchFilms() {
    filmsCache = await Films.find({}).sort({date: 1}).exec();
}

fetchFilms();

router.get('/', (req, res) => {
    res.redirect('/bio-rosen/filmer');
})

router.get('/filmer', (req, res) => {
    res.render('filmer', { 
        title: 'Filmer', 
        uniqueTitle: 'Bio Rosen',
        films: filmsCache,
    });
});

router.get('/live-pa-bio', (req, res) => {
    res.render('livePaBio', { title: 'Live På Bio', uniqueTitle: 'Bio Rosen' });
});

router.get('/bio-kontrast', (req, res) => {
    res.render('bioKontrast', { title: 'Bio Kontrast', uniqueTitle: 'Bio Rosen' });
});

module.exports = router;