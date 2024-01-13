const express = require('express');
const router = express.Router();

const { getCache } = require('./films-cache.js')

router.get('/', (req, res) => {
    res.redirect('/bio-rosen/filmer');
})

router.get('/filmer', async (req, res) => {
    var tempCache = getCache();
    res.render('filmer', {
        title: 'Filmer', 
        uniqueTitle: 'Bio Rosen',
        films: tempCache['film'],
        more: {
            live: tempCache['live'][0],
            kontrast: tempCache['kontrast'][0],
        },
    });
});

router.get('/live-pa-bio', (req, res) => {
    var tempCache = getCache();
    res.render('livePaBio', {
        title: 'Live På Bio', 
        uniqueTitle: 'Bio Rosen',
        films: tempCache['live'],
        more: {
            film: tempCache['film'][0],
            kontrast: tempCache['kontrast'][0],
        },
    });
});

router.get('/bio-kontrast', (req, res) => {
    var tempCache = getCache();
    res.render('bioKontrast', {
        title: 'Bio Kontrast', 
        uniqueTitle: 'Bio Rosen',
        films: tempCache['kontrast'],
        more: {
            film: tempCache['film'][0],
            live: tempCache['live'][0],
        },
    });
});

module.exports = router;