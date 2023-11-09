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
    });

    await Live.deleteMany({
        date: {
            $gte: new Date(2000, 1, 1), 
            $lt: new Date()
        }
    });

    await Kontrast.deleteMany({
        date: {
            $gte: new Date(2000, 1, 1), 
            $lt: new Date()
        }
    });



}