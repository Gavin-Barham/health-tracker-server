const {  handleLogin, handleRegister, handleRefreshToken, handleCheckToken  } = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const validateJTW = require('../middleware/validateJWT');

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/login', handleLogin);
router.post('/register', handleRegister)
router.get('/refresh', handleRefreshToken)
router.post('/check-token', validateJTW, handleCheckToken)

module.exports = router;