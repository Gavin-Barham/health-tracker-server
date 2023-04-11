const controllers = require('../controllers/users');
const express = require('express');
const router = express.Router();
const validateAuthToken = require('../utils/validateAuthToken');

// ROUTES FOR /users
router.get('/', validateAuthToken, controllers.getAllUsers); //GET ALL USERS
router.delete('/:id', validateAuthToken, controllers.deleteUser); //DELETE USER

module.exports = router;