const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateLogin = require('../utils/validateLogin');

// CRUD CONTROLLERS

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
  const userName = await User.findOne({ where: { username: req.body.username } });
  if (userName) return res.status(400).send('Username already exists');
  const userEmail = await User.findOne({ where: { email: req.body.email } });
  if (userEmail) return res.status(400).send('Email already exists');


  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  User.create({
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

// Validate login
exports.login = async (req, res) => {
  try {
    // Validate user input
    const { error, status, message } = validateLogin(req.body);
    if (error) return res.status(status).send(message);

    // Check if user exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Email is incorrect');

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is incorrect');

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}
