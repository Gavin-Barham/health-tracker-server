const Users = require('../models/users')

module.exports = function verifyUserExists(id) {
    Users.findByPk(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'user not found'})
        }
        return user
    })
    .catch(err => {
        return res.status(500).json({ message: err.message })
    })
}