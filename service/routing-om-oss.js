const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('om-oss/vi-som-jobbar-har');
});

router.get('/vi-som-jobbar-har', (req, res) => {
    res.render('viSomJobbarHar', { title: 'Vi Som Jobbar Här' });
});

router.get('/om-huset', (req, res) => {
    res.render('omHuset', { title: 'Om Huset' });
});

router.get('/folkets-hus-hallstavik-100-ar', (req, res) => {
    res.render('folketsHus100Ar', { title: 'Folkets Hus 100 År' });
});

router.get('/vara-hyresgaster', (req, res) => {
    res.render('varaHyresgaster', { title: 'Våra Hyresgäster' });
});

module.exports = router;