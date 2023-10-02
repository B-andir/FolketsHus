const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const dbUrl = process.env.MONGODB_URL;
const connect = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));
    db.once('open', () => {
        console.log('\nConnected to MongoDB Database');
    });
}

module.exports = { connect };