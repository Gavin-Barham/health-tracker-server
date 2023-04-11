const jwt = require('jsonwebtoken');


function authorize(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: token is not valid or empty');
  }
  const token = authHeader.substring(7);
  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_TOKEN);
  } catch (error) {
    return res.status(401).send('Unauthorized: token does not match');
  }

  // if (payload.exp < Date.now() / 1000 || payload.iss !== 'myapp' || payload.aud !== 'myapi') {
  //   return res.status(401).send('Unauthorized');
  // }

  req.user = payload;

  next();
}

module.exports = authorize;