const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'Hello@1234#$%');
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
