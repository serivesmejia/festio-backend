const pool = require("../db");

// Comprar boletos
exports.buyTickets = async (req, res) => {
  const { concertId, quantity } = req.body;
  const userId = req.user.id;

  if (!concertId || !quantity) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const concert = await pool.query(
      "SELECT * FROM concerts WHERE id=$1",
      [concertId]
    );

    if (concert.rows.length === 0) {
      return res.status(404).json({ message: "Concert not found" });
    }

    const ticket = await pool.query(
      "INSERT INTO tickets (user_id, concert_id, quantity) VALUES ($1,$2,$3) RETURNING *",
      [userId, concertId, quantity]
    );

    res.status(201).json(ticket.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error buying tickets" });
  }
};

// Ver boletos del usuario
exports.getMyTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const tickets = await pool.query(
      `
      SELECT 
        tickets.id,
        concerts.artista,
        concerts.ciudad,
        concerts.fecha,
        tickets.quantity
      FROM tickets
      JOIN concerts ON concerts.id = tickets.concert_id
      WHERE tickets.user_id = $1
      `,
      [userId]
    );

    res.json(tickets.rows);

  } catch {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};