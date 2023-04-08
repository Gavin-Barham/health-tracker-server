const controllers = require('../controllers/users');
const express = require('express');
const router = express.Router();

// ROUTES FOR /users
router.get('/', controllers.getAllUsers); //GET ALL USERS
router.get('/:id', controllers.getUserById); //GET USER BY ID
router.post('/', controllers.createUser); //CREATE USER
router.put('/:id', controllers.updateUser); //UPDATE USER
router.delete('/:id', controllers.deleteUser); //DELETE USER

module.exports = router;