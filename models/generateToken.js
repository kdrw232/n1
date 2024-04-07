const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (userData) => {
  const { id, username, isAdmin } = userData;
  const tokenData = { id, username, isAdmin };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = generateToken