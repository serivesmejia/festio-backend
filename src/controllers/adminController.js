import sql from "../db.js"; // tu conexión con postgres.js

// Crear concierto
export const createConcert = async (req, res) => {
  const { artista, ciudad, fecha, precio } = req.body;

  if (!artista || !ciudad || !fecha || !precio) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [newConcert] = await sql`
      INSERT INTO concerts (artista, ciudad, fecha, precio)
      VALUES (${artista}, ${ciudad}, ${fecha}, ${precio})
      RETURNING *
    `;
    res.status(201).json(newConcert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// Actualizar concierto
export const updateConcert = async (req, res) => {
  const { id } = req.params;
  const { artista, ciudad, fecha, precio } = req.body;

  try {
    const [updatedConcert] = await sql`
      UPDATE concerts
      SET artista = ${artista}, ciudad = ${ciudad}, fecha = ${fecha}, precio = ${precio}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedConcert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.json(updatedConcert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// Eliminar concierto
export const deleteConcert = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletedConcert] = await sql`
      DELETE FROM concerts WHERE id = ${id} RETURNING *
    `;

    if (!deletedConcert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.json({ message: "Concert deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// Obtener todos (sin paginación para admin)
export const getAllConcertsAdmin = async (req, res) => {
  try {
    const concerts = await sql`
      SELECT * FROM concerts ORDER BY fecha DESC
    `;
    res.json(concerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

export const getAdminData = async (req, res) => {
  try {
    // Todos los conciertos
    const concerts = await sql`SELECT * FROM concerts ORDER BY fecha DESC`;

    const tickets = await sql`
      SELECT tickets.id, tickets.user_id, tickets.concert_id, tickets.quantity,
             concerts.artista, concerts.ciudad, concerts.fecha
      FROM tickets
      JOIN concerts ON concerts.id = tickets.concert_id
      ORDER BY concerts.fecha DESC
    `;

    res.json({ concerts, tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};