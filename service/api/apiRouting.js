const express = require('express');
const router = express.Router();

const auth = require('./auth');

router.post('/appAuth', async (req, res) => {
    console.log(req.body["password"]);
    auth.authorize('APPUSER', req.body["password"]);

    res.status(401).send();
});

module.exports = router;