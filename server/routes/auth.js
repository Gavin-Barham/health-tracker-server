const {login, register} = require('../controllers/auth');
const express = require('express');
const router = express.Router();

// POST route to authenticate user login
router.post('/login', login); // LOGIN PREVIOUS USER
router.post('/register', register); // REGISTER NEW USER

module.exports = router;