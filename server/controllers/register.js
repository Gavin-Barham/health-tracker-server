const Users = require('../models/users');
const bcrypt = require('bcrypt');

// REGISTER NEW USER
exports.register = async (req, res) => {
    const {username, email, password} = req.body;

    // Check if user req is valid
    if (!username ||!email ||!password) {
        return res.status(400).send('Please enter all fields');
    }
    else if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters');
    };


    // Check if user exists
    const userName = await Users.findOne({ where: { username: req.body.username } });
    if (userName) return res.status(400).send('Username already exists');
    const userEmail = await Users.findOne({ where: { email: req.body.email } });
    if (userEmail) return res.status(400).send('Email already exists');


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    Users.create({
        username: username,
        email: email,
        password: hashedPassword,
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