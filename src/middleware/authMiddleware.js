// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ message: "No autorizado" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // aquí debe tener { id, role }
    next();
  } catch (err) {
    console.error("Token error:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
};

// middleware/roleMiddleware.js
module.exports = function (roles = []) {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Rol insuficiente" });
    }

    next();
  };
};