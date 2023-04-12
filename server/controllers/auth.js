const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const validateLogin = require('../middleware/validateLogin');

// CRUD CONTROLLERS


// REGISTER NEW USER
exports.handleRegister = async (req, res) => {
  const {username, email, password} = req.body;

  // CHECK IF USER REQ IS VALID
  if (!username ||!email ||!password) {
      return res.status(400).send('Please enter all fields');
  }
  else if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters');
  };


  // CHECK IF USER ALREADY EXISTS
  const userName = await User.findOne({ where: { username: req.body.username } });
  if (userName) return res.status(400).send('Username already exists');
  const userEmail = await User.findOne({ where: { email: req.body.email } });
  if (userEmail) return res.status(400).send('Email already exists');

  // ENCRYPT PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // ADD NEW USER TO DATABASE
  try {
    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
    })
    console.log("created user");
    res.status(201).json({
        message: 'user created successfully',
        user: user
    });

  } catch(err) {
        console.error(err);
        res.status(500).send('Internal server error');
  };
};


// VALIDATE LOGIN
exports.handleLogin = async (req, res) => {

    // VALIDATE USER REQUEST
    const { error, status, message } = validateLogin(req.body);
    if (error) return res.status(status).send(message);

    // CHECK IF USER EXISTS
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Email is incorrect');

    // CHECK IF PASSWORD MATCHES
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Password is incorrect');

    // CREATE AND ASSIGN JWT TOKEN
    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '900s' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
    try {
    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 7 * 60 * 60 * 1000 });
    res.header('auth-token', accessToken).send(accessToken);
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).send('Unauthorized');
  const refreshToken = cookies.jwt;
  try{
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    })
    if (!user) return res.status(403).send('Unauthorized');
    const match = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
    if (!match) return res.status(403).send('Forbidden')
    const payload = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '900s' });
    console.log(payload);
    res.header('auth-token', payload).send(payload);
  } catch(err)  {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}