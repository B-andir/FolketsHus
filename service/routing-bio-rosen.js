const express = require('express');
const router = express.Router();

const Films = require('../models/filmModel.js');
const Live = require('../models/liveModel.js');
const Kontrast = require('../models/kontrastModel.js');

let cache = {
    'films': {},
    'films-time': 0,
    'live': {},
    'live-time': 0,
    'kontrast': {},
    'kontrast-time': 0,
};

async function fetchFilms() {
    console.log('Updating Films Cache');
    cache['films'] = await Films.find({}).sort({date: 1}).exec();


    cache['films-time'] = Date.now();

    console.log('Finished Updating Films Cache');
    return {result: 'done'}
}

async function fetchLive() {
    console.log('Updating Live Cache');
    cache['live'] = await Live.find({}).sort({date: 1}).exec();

    cache['live-time'] = Date.now();

    console.log('Finished Updating Live Cache');
    return {result: 'done'}
}

async function fetchKontrast() {
    console.log('Updating Kontrast Cache');
    cache['kontrast'] = await Kontrast.find({}).sort({date: 1}).exec();

    cache['kontrast-time'] = Date.now();

    console.log('Finished Updating Kontrast Cache');
    return {result: 'done'}
}

async function updateFilmsIfNeeded() {
    
    if (cache['films'] == null || Date.now() - cache['films-time'] > 43200000) {  // 12h in milliseconds
        await fetchFilms();
    }

    return {result: 'done'}
}

async function updateLiveIfNeeded() {
    
    if (cache['live'] == null || Date.now() - cache['live-time'] > 43200000) {  // 12h in milliseconds
        await fetchLive();
    }

    return {result: 'done'}
}

async function updateKontrastIfNeeded() {
    
    if (cache['kontrast'] == null || Date.now() - cache['kontrast-time'] > 43200000) {  // 12h in milliseconds
        await fetchKontrast();
    }

    return {result: 'done'}
}

function getFilmCache() {
    updateFilmsIfNeeded();
    return cache['films'];
}

function getLiveCache() {
    updateLiveIfNeeded();
    return cache['live'];
}

function getKontrastCache() {
    updateKontrastIfNeeded();
    return cache['kontrast'];
}

async function updateAll() {
    fetchFilms();
    fetchLive();
    fetchKontrast();
}

updateAll();

router.get('/', (req, res) => {
    res.redirect('/bio-rosen/filmer');
})

router.get('/filmer', async (req, res) => {
    res.render('filmer', {
        title: 'Filmer', 
        uniqueTitle: 'Bio Rosen',
        films: getFilmCache(),
    });
});

router.get('/live-pa-bio', (req, res) => {
    res.render('livePaBio', {
        title: 'Live På Bio', 
        uniqueTitle: 'Bio Rosen',
        films: getLiveCache(),
    });
});

router.get('/bio-kontrast', (req, res) => {
    res.render('bioKontrast', {
        title: 'Bio Kontrast', 
        uniqueTitle: 'Bio Rosen',
        films: getKontrastCache(),
    });
});

module.exports = router, updateAll;