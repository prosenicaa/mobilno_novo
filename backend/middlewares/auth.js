const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided.' });

  jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token.' });
    req.userId = decoded._id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Admin role required.' });
  }
  next();
};
