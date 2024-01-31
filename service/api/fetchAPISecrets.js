const APIs = require('../../models/APIModel.js');

module.exports = async (requestedAPI, res) => {
    console.log(requestedAPI);
    const result = await APIs.findOne({ API: requestedAPI });

    if (result == null) {
        console.log(err);
        res
            .status(500)
            .send("Internal Server Error");
    } else {
        if (result == null) {
            res
                .status(400)
                .send("Bad Request");
        } else {

            res
                .status(200)
                .json({data: result.data});

        }
    }
}