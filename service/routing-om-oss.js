const express = require('express');
const router = express.Router();

router.get('/vi-som-jobbar-har', (req, res) => {
    res.render('viSomJobbarHar', { title: 'Vi Som Jobbar Här' });
});

router.get('/om-huset', (req, res) => {
    res.render('omHuset', { title: 'Om Huset' });
});

router.get('/folkets-hus-100-ar', (req, res) => {
    res.render('folketsHus100Ar', { title: 'Folkets Hus 100 År' });
});

router.get('/vara-hyresgaster', (req, res) => {
    res.render('varaHyresgaster', { title: 'Folkets Hus 100 År' });
});

module.exports = router;