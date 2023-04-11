const Users = require('../models/users');

// CRUD CONTROLLERS

// GET ALL USERS
exports.getAllUsers = (req, res) => {
    Users.findAll()
    .then(users => {
        res.status(200).json({users: users});
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