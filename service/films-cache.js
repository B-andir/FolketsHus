const Films = require('../models/filmModel.js');
const Live = require('../models/liveModel.js');
const Kontrast = require('../models/kontrastModel.js');

let cache = {
    'film': {},
    'film-time': 0,
    'film-need-update': false,
    'live': {},
    'live-time': 0,
    'live-need-update': false,
    'kontrast': {},
    'kontrast-time': 0,
    'kontrast-need-update': false,
};

async function fetchFilm() {
    console.log('Updating Film Cache');
    cache['film'] = await Films.find({}).sort({date: 1}).exec();


    cache['film-time'] = Date.now();

    console.log('Finished Updating Film Cache');
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

async function updateFilmIfNeeded() {
    
    if (cache['film'] == null || Date.now() - cache['film-time'] > 43200000 || cache['film-need-update'] == true) {  // 12h in milliseconds
        await fetchFilm();
    }

    return {result: 'done'}
}

async function updateLiveIfNeeded() {
    
    if (cache['live'] == null || Date.now() - cache['live-time'] > 43200000 || cache['live-need-update'] == true) {  // 12h in milliseconds
        await fetchLive();
    }

    return {result: 'done'}
}

async function updateKontrastIfNeeded() {
    
    if (cache['kontrast'] == null || Date.now() - cache['kontrast-time'] > 43200000 || cache['kontrast-need-update'] == true) {  // 12h in milliseconds
        await fetchKontrast();
    }

    return {result: 'done'}
}

function getFilmCache() {
    updateFilmIfNeeded();
    return cache['film'];
}

function getLiveCache() {
    updateLiveIfNeeded();
    return cache['live'];
}

function getKontrastCache() {
    updateKontrastIfNeeded();
    return cache['kontrast'];
}

async function updateAllIfNeeded() {
    updateFilmIfNeeded();
    updateLiveIfNeeded();
    updateKontrastIfNeeded();
}

async function updateAll() {
    fetchFilm();
    fetchLive();
    fetchKontrast();
}

updateAll();

function getAllCache() {
    updateAllIfNeeded();

    return {
        'film': cache['film'],
        'live': cache['live'],
        'kontrast': cache['kontrast'],
    };
}

module.exports = {
    getCache: (MODE) => {
        MODE = MODE || 'none';
        mode = MODE.toLowerCase();

        if (mode == 'film') {
            return getFilmCache();
        } else if (mode == 'live') {
            return getLiveCache();
        } else if (mode == 'kontrast') {
            return getKontrastCache();
        } else {
            return getAllCache();
        }
    }, updateAll, updateAllIfNeeded, cache,
}