const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}

module.exports = verifyToken;
