// MODELS
const Users = require('../models/users');

// MIDDLEWARE
const verifyUserExists = require('../middleware/verifyUserExists');


// CRUD CONTROLLERS //

// GET ALL USERS
exports.getAllUsers = (req, res) => {
    Users.findAll()
    .then(users => {
        res.status(200).json({users: users});
    })
    .catch(err => console.error(err));
}

// UPDATE USER
exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const user = verifyUserExists(id)
    Users.update({
        username: updatedUser.username || user.username || null,
          email: updatedUser.email || user.email || null,
          password: updatedUser.password || user.password || null,
          height: updatedUser.height || user.height || null,
          target_cal: updatedUser.target_cal || user.targetCal || null
    }, {
        where: {
            id: id
        }
    })
   .then(user => {
        res.status(200).json({
            message: 'user updated successfully',
            user: user
        });
    })
   .catch(err => console.error(err));
}

// DELETE USER
exports.deleteUserById = (req, res) => {
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