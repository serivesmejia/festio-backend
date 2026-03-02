import sql from "../db.js"; // tu conexión con postgres.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Faltan datos requeridos" });

    const [userExist] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (userExist) return res.status(400).json({ message: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const [newUser] = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashed}, 'user')
      RETURNING id, name, email, role
    `;

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Faltan datos requeridos" });

    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user) return res.status(401).json({ message: "Usuario o contraseña incorrecta" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Usuario o contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener perfil
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [user] = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${userId}
    `;
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user });
  } catch (err) {
    console.error("Error getProfile:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};