const express = require('express');
const session = require('express-session');
const device = require('express-device');
const morgan = require('morgan');
const database = require("./database.js");
const routing = require('./service/routing.js');
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

// ------ Routing ------

app.use('/', routing);

// ------

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}...`);
});