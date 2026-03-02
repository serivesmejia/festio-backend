module.exports = function (roles = []) {
  // Permite pasar un string solo como rol, lo convierte a array
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    // Si no hay usuario (JWT no decodificado) bloquea
    if (!req.user) return res.status(401).json({ message: "No autorizado" });

    // Verifica si el rol del usuario está permitido
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Rol insuficiente" });
    }

    // Todo bien, pasa al siguiente middleware o ruta
    next();
  };
};