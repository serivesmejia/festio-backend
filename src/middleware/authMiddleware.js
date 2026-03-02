const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = auth.split(" ")[1];

  try {
    // Decodifica el token usando tu secreto
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guarda id y role en req.user para usar en otros middlewares
    req.user = decoded;

    next(); // pasa al siguiente middleware o ruta
  } catch (err) {
    console.error("Token error:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
};