const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Hem' });
});

router.get('/unes-kok-bar', (req, res) => {
    res.render('unesKokBar', { title: 'Unes Kök & Bar'});
});

router.get('/boka-lokal', (req, res) => {
    res.render('bokaLokal', { title: 'Boka Lokal' });
});

router.use('/bio-rosen', require('./routing-bio-rosen.js'));

router.use('/om-oss', require('./routing-om-oss.js'));


// 404

router.get (('*'), (req, res) => {
    res.status(404).send('404, Not Found');
});


module.exports = router;