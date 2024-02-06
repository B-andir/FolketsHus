const jwt = require('jsonwebtoken');

const Users = require('../models/userModel');

require('dotenv').config();

module.exports = async (req, res, next) => {
    const accessToken = req.body['accessToken'];

    if (accessToken) {

        await jwt.verify(accessToken, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                res
                    .status(400)
                    .send("Invalid Access Token");

                return;
            }

            if (decoded) {
                const user = await Users.findOne({ pubId: decoded.sub });

                if (user) {
    
                    var expirationMilliseconds = 30 * 1000;  // Seconds * 1000 = milliseconds
                    var timeDiff = new Date().getTime() - user.accessKeyCreated.getTime();

                    if (timeDiff <= expirationMilliseconds) {
    
                        if (user.accessKey == decoded.key) {
    
                            next();
    
                        } else {
                            res
                                .status(400)
                                .send("Invalid Access Token");

                            return;
                        }
                    } else {
                        console.warn("WARNING: Expired access key! This should not be called, as expired tokens should be caught before this check. Potential JWT manipulation");
                        res
                            .status(400)
                            .send("Invalid Access Token");

                        return;
                    }
    
                } else {
                    res
                        .status(400)
                        .send("Invalid Access Token");

                    return;
                }
            } else {
                res
                    .status(400)
                    .send("Invalid Access Token")

                return;
            }

            
        });

    } else {
        res
            .status(401)
            .send("No Access Token");

        return;
    }
}
