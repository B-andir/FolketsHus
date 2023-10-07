const express = require('express');
const router = express.Router();

router.get('/filmer', (req, res) => {
    res.render('filmer', { title: 'Filmer', uniqueTitle: 'Bio Rosen' });
});

router.get('/live-pa-bio', (req, res) => {
    res.render('livePaBio', { title: 'Live På Bio', uniqueTitle: 'Bio Rosen' });
});

router.get('/bio-kontrast', (req, res) => {
    res.render('bioKontrast', { title: 'Bio Kontrast', uniqueTitle: 'Bio Rosen' });
});

module.exports = router;