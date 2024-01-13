const filmsCache = require('./films-cache.js');

const Films = require('../models/filmModel.js');
const Live = require('../models/liveModel.js');
const Kontrast = require('../models/kontrastModel.js');

module.exports = async () => {
    console.log('\nClear old database entries')

    

    await Films.deleteMany({
        date: {
            $gte: new Date(2000, 1, 1), 
            $lt: new Date()
        }
    }).then((result) => {
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} films.`);
            filmsCache.cache['film-need-update'] = true;
        } else console.log('No films deleted.');
    });
    

    await Live.deleteMany({
        date: {
            $gte: new Date(2000, 1, 1), 
            $lt: new Date()
        }
    }).then((result) => {
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} live.`);
            filmsCache.cache['live-need-update'] = true;
        } else console.log('No live deleted.');
    });

    await Kontrast.deleteMany({
        date: {
            $gte: new Date(2000, 1, 1), 
            $lt: new Date()
        }
    }).then((result) => {
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} kontrast.`);
            filmsCache.cache['kontrast-need-update'] = true;
        } else console.log('No kontrast deleted.');
    });

    await filmsCache.updateAllIfNeeded();
}