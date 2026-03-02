import sql from "../db.js";

// Comprar boletos
export const buyTickets = async (req, res) => {
  const { concertId, quantity } = req.body;
  const userId = req.user.id;

  if (!concertId || !quantity) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const [concert] = await sql`
      SELECT *
      FROM concerts
      WHERE id = ${concertId}
    `;

    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    const [ticket] = await sql`
      INSERT INTO tickets (user_id, concert_id, quantity)
      VALUES (${userId}, ${concertId}, ${quantity})
      RETURNING *
    `;

    res.status(201).json(ticket);

  } catch (error) {
    console.error("Error buying tickets:", error);
    res.status(500).json({ message: "Error buying tickets" });
  }
};

// Ver boletos del usuario
export const getMyTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const tickets = await sql`
      SELECT 
        tickets.id,
        concerts.artista,
        concerts.ciudad,
        concerts.fecha,
        tickets.quantity
      FROM tickets
      JOIN concerts ON concerts.id = tickets.concert_id
      WHERE tickets.user_id = ${userId}
    `;

    res.json(tickets);

  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};