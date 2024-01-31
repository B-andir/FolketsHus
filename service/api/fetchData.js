const filmsCache = require('../films-cache');

module.exports = (targetData, res) => {

    let data = {};

    if (targetData == 'all' || targetData == "") {

        data['BioRosen'] = filmsCache.getCache()

    } else if (targetData == 'filmer') {

        data['BioRosen'] = filmsCache.getCache("film");

    } else if (targetData == 'live') {

        data['BioRosen'] = filmsCache.getCache("live");

    } else if (targetData == 'kontrast') {

        data['BioRosen'] = filmsCache.getCache("kontrast");

    }

    res
        .status(200)
        .json(data);
}