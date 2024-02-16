const express = require('express');
const session = require('express-session');
const device = require('express-device');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const database = require("./database.js");
const routing = require('./service/routing.js');
const apiRouting = require('./service/api/apiRouting.js');
const schedule = require('node-schedule');
const cloudinary = require('cloudinary');

require('dotenv').config();

// ------ INIT ------

database.connect();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

app.use(device.capture());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    name: 'FHHSession',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENVIRONMENT != 'development',
        maxAge: 10800000,  // 3 hours in milliseconds
    },
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

device.enableDeviceHelpers(app);

app.set('view engine', 'ejs');
app.use(morgan( process.env.NODE_ENVIRONMENT == 'development' ? 'dev' : 'short'));

let funcCall = require('./service/remove-outdated-movies.js');
funcCall();
const dbClearOld = schedule.scheduleJob('* 0,24 * * *', funcCall)

// ------ Routing ------

app.use('/api', apiRouting);

app.use('/', routing);

// ------

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}...`);
});