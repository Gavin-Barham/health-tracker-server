const {  handleLogin, handleRegister, handleRefreshToken  } = require('../controllers/auth');
const express = require('express');
const router = express.Router();

// ROUTES TO AUTHENTICATE CLIENTS
router.post('/login', handleLogin);
router.post('/register', handleRegister)
router.get('/refresh', handleRefreshToken)

module.exports = router;