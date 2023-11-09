const express = require('express');
const session = require('express-session');
const device = require('express-device');
const morgan = require('morgan');
const database = require("./database.js");
const routing = require('./service/routing.js');
const schedule = require('node-schedule');
require('dotenv').config();

// ------ INIT ------

database.connect();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

app.use(device.capture());
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

device.enableDeviceHelpers(app);

app.set('view engine', 'ejs');
app.use(morgan( process.env.NODE_ENVIRONMENT == 'development' ? 'dev' : 'short'));

// let funcCall = require('./service/remove-outdated-movies.js');
// funcCall();
const dbClearOld = schedule.scheduleJob('* 0,24 * * *', require('./service/remove-outdated-movies.js'))

// ------ Routing ------

app.use('/', routing);

// ------

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}...`);
});