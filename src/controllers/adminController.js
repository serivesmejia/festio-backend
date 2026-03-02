const pool = require("../db");

// Crear concierto
exports.createConcert = async (req, res) => {
  const { artista, ciudad, fecha, precio } = req.body;

  if (!artista || !ciudad || !fecha || !precio) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const result = await pool.query(
    "INSERT INTO concerts (artista, ciudad, fecha, precio) VALUES ($1,$2,$3,$4) RETURNING *",
    [artista, ciudad, fecha, precio]
  );

  res.status(201).json(result.rows[0]);
};

// Actualizar concierto
exports.updateConcert = async (req, res) => {
  const { id } = req.params;
  const { artista, ciudad, fecha, precio } = req.body;

  const result = await pool.query(
    "UPDATE concerts SET artista=$1, ciudad=$2, fecha=$3, precio=$4 WHERE id=$5 RETURNING *",
    [artista, ciudad, fecha, precio, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Concert not found" });
  }

  res.json(result.rows[0]);
};

// Eliminar concierto
exports.deleteConcert = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM concerts WHERE id=$1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Concert not found" });
  }

  res.json({ message: "Concert deleted" });
};

// Obtener todos (sin paginación para admin)
exports.getAllConcertsAdmin = async (req, res) => {
  const result = await pool.query("SELECT * FROM concerts ORDER BY fecha DESC");
  res.json(result.rows);
};