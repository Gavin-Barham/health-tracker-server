const controllers = require('../controllers/users');
const express = require('express');
const router = express.Router();

// ROUTES FOR /users
router.get('/users', controllers.getAllUsers); //GET ALL USERS
router.get('/users/:id', controllers.getUserById); //GET USER BY ID
router.post('/users', controllers.createUser); //CREATE USER
router.put('/users/:id', controllers.updateUser); //UPDATE USER
router.delete('/users/:id', controllers.deleteUser); //DELETE USER

module.exports = router;