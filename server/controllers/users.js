const Users = require('../models/user');

// CRUD CONTROLLERS

// GET ALL USERS
exports.getAllUsers = (req, res) => {
    Users.findAll()
    .then(users => {
        res.status(200).json({users: users});
    })
    .catch(err => console.error(err));
}

// GET USER BY ID
exports.getUserById = (req, res) => {
    Users.findByPk(req.params.id)
   .then(user => {
        if (user) {
            res.status(200).json({user: user});
        }
    })
   .catch(err => console.error(err));
}

// CREATE USER
exports.createUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const height = req.body.height;
    Users.create({
        username: username,
        password: password,
        height: height
    })
   .then(user => {
        console.log("created user");
        res.status(201).json({
            message: 'user created successfully',
            user: user
        });
    })
   .catch(err => console.error(err));
}

// UPDATE USER
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const updatedUsername = req.body.username;
    const updatedPassword = req.body.password;
    Users.findByPk(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found'})
        }
        user.username = updatedUsername;
        user.password = updatedPassword;
        return user.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'user updated successfully',
            user: result
        });
    })
    .catch(err => console.error(err));
}

// DELETE USER
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found'})
        }
        return user.destroy({
            where: {
                id: id
            }
        })
    })
    .then(user => {
        res.status(200).json({
            message: 'user deleted successfully',
            user: user
        });
    })
    .catch(err => console.error(err));
}