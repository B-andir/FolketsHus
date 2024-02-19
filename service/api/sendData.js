const cloudinary = require('cloudinary');

const Films = require('../../models/filmModel.js');
const Live = require('../../models/liveModel.js');
const Kontrast = require('../../models/kontrastModel.js');

const filmsCache = require('../films-cache');

module.exports = async (data, res) => {

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

            DBdata['showType'] = 'film';

            await Films.create(DBdata);

            await filmsCache.updateCache("film");

            res
                .status(200)
                .json({'film': filmsCache.getCache('film')});

            return;

        } else if (showType == "Live") {

            DBdata['livePauses'] = data['livePauses'];
            DBdata['showType'] = 'live';

            await Live.create(DBdata);

            await filmsCache.updateCache("live");

            res
                .status(200)
                .json({'live': filmsCache.getCache('live')});

        } else if (showType == "Kontrast") {

            DBdata['showType'] = 'kontrast';

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

    } else if (type == "DeleteElement") {

        let elementType = data['elementType'];

        if (elementType == "film") {

            var result = await Films.findOneAndDelete({ _id: data['_id']});

            if (result) {
                if (result.posterCloudinaryID) {
                    console.log("Found cloudinary ID. Deleting");
                    var deleteResponse = await cloudinary.uploader.destroy(result.posterCloudinaryID);

                    if (deleteResponse.result != 'ok') {
                        console.log(`Error deleting cloudinary image of ID ${result.posterCloudinaryID}`)
                    }
                }

                await filmsCache.updateCache('film');
        
                res
                    .status(200)
                    .json({'film': filmsCache.getCache('film')});
                
            } else {
                res
                    .status(404)
                    .send(`Could not find ${elementType} of id ${data['_id']}`);

                return;
            }
            
        } else if (elementType == "live") {

            var result = await Live.findOneAndDelete({ _id: data['_id']});

            if (result) {
                if (result.posterCloudinaryID) {
                    console.log("Found cloudinary ID. Deleting");
                    var deleteResponse = await cloudinary.uploader.destroy(result.posterCloudinaryID);

                    if (deleteResponse.result != 'ok') {
                        console.log(`Error deleting cloudinary image of ID ${result.posterCloudinaryID}`)
                    }
                }

                await filmsCache.updateAll('live');
        
                res
                    .status(200)
                    .json({'live': filmsCache.getCache('live')});

            } else {
                res
                    .status(404)
                    .send(`Could not find ${elementType} of id ${data['_id']}`);

                return;
            }
            
        } else if (elementType == "kontrast") {

            var result = await Kontrast.findOneAndDelete({ _id: data['_id']});

            if (result) {
                if (result.posterCloudinaryID) {
                    console.log("Found cloudinary ID. Deleting");
                    var deleteResponse = await cloudinary.uploader.destroy(result.posterCloudinaryID);

                    if (deleteResponse.result != 'ok') {
                        console.log(`Error deleting cloudinary image of ID ${result.posterCloudinaryID}`)
                    }
                }

                await filmsCache.updateAll('kontrast');
        
                res
                    .status(200)
                    .json({'kontrast': filmsCache.getCache('kontrast')});

            } else {
                res
                    .status(404)
                    .send(`Could not find ${elementType} of id ${data['_id']}`);

                return;
            }

        } else {

            res
                .status(400)
                .send(`Cannot delete element of type ${elementType}`)

        }

    } else {
        res
            .status(400)
            .send("Bad Request");

        return;
    }

};
