const {handleLogin, handleRegister, handleRefreshToken} = require('../controllers/auth');
const express = require('express');
const router = express.Router();

// POST ROUTES TO AUTHENTICATE CLIENTS
router.post('/login', handleLogin); // LOGIN PREVIOUS USER
router.post('/register', handleRegister); // REGISTER NEW USER
router.get('/refresh', handleRefreshToken) // REFRESH CLIENT ACCESS TOKEN

module.exports = router;