const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
  
  const token = req.cookies.token ;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
