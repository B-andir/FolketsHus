const Films = require('../../models/filmModel.js');
const Live = require('../../models/liveModel.js');
const Kontrast = require('../../models/kontrastModel.js');

const filmsCache = require('../films-cache');

module.exports = async (data, res) => {

    console.log("Send Data Request Recieved\n\ndata:");
    console.log(data);

    let type = data['dataType'];

    // If sent data is meant for Bio Rosen
    if (type == "BioRosenShow") {
        let showType = data['showType'];

        let DBdata = {
            name: data["title"],
            runtime: data["runTime"],
            description: data["description"],
            date: data["runDate"],
            posterURL: data["posterURL"],
            posterCloudinaryID: data["posterCloudinaryId"],
            trailerURL: data["trailerURL"],
            ticketURL: data["ticketURL"],
            ageRating: data["ageRating"],
            genre: data["genre"],
            premiere: data["isPremiere"]
        }

        if (showType == "Film") {

            await Films.create(DBdata);

            await filmsCache.updateCache("film");

            res
                .status(200)
                .json({'film': filmsCache.getCache('film')});

            return;

        } else if (showType == "Live") {

            DBdata['livePauses'] = data['livePauses'];

            await Live.create(DBdata);

            await filmsCache.updateCache("live");

            res
                .status(200)
                .json({'live': filmsCache.getCache('live')});

        } else if (showType == "Kontrast") {

            await Kontrast.create(DBdata);

            await filmsCache.updateCache("kontrast");

            res
                .status(200)
                .json({'kontrast': filmsCache.getCache('kontrast')});

        } else {
            res
                .status(400)
                .send("Bad Request");
            
            return;
        }

    } else {
        res
            .status(400)
            .send("Bad Request");

        return;
    }

};
