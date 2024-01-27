const express = require('express');
const router = express.Router();

const auth = require('./auth');

router.post('/appAuth', async (req, res) => {
    auth.authorize('APPUSER', req.body["password"], res);
});

module.exports = router;