const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../../middleware/authenticate');

const auth = require('./auth');
const fetchData = require('./fetchData');
const sendData = require('./sendData');

function authenticate(req, res, next) {
    authenticateMiddleware(req, res, next);
}

router.post('/appAuth', async (req, res) => {
    auth.authorize('APPUSER', req.body['password'], res);
});

router.post('/authorize', async (req, res) => {
    auth.authorize(req.body['username'], req.body['password'], res);
});

router.post('/refreshAccessToken', async (req, res) => {
    auth.refreshAccessToken(req.body['refreshToken'], res);
});

router.post('/fetchData', authenticate, async (req, res) => {
    fetchData(req.body.data.targetData, res);
});

router.post('/sendData', authenticate, async (req, res) => {
    
});

module.exports = router;