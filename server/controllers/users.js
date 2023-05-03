// MODELS
const Users = require('../models/users');


// CRUD CONTROLLERS //

// UPDATE USER
exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    Users.findByPk(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found'})
        }
        Users.update({
            username: updatedUser.username || user.username,
              email: updatedUser.email || user.email,
              password: updatedUser.password || user.password,
              height: updatedUser.height || user.height,
              target_cal: updatedUser.target_cal || user.targetCal
        }, {
            where: {
                id: id
            }
        })
       .then(user => {
            res.status(200).json({
                message: 'user updated successfully',
                rows: user
            });
        })
       .catch(err => res.status(500).json({message: err.message}))

    })
    .catch(err => {
        return res.status(500).json({ message: err.message })
    })
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
            rows: user
        });
    })
    .catch(err => res.status(500).json({message: err.message}));
}