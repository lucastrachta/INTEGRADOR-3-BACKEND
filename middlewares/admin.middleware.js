function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado: solo para administradores" });
  }
  next();
}

module.exports = verifyAdmin;
