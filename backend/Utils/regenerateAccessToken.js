const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: 3600000 } 
  );
};

module.exports = { generateAccessToken };
