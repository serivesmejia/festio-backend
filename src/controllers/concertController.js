import sql from "../db.js";

// GET /concerts?page=1&limit=5
export const getConcerts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const concerts = await sql`
      SELECT *
      FROM concerts
      ORDER BY fecha DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const [totalResult] = await sql`SELECT COUNT(*) FROM concerts`;

    res.json({
      page,
      limit,
      total: parseInt(totalResult.count),
      data: concerts
    });
  } catch (error) {
    console.error("Error fetching concerts:", error);
    res.status(500).json({ message: "Error fetching concerts" });
  }
};

// GET /concerts/:id
export const getConcertById = async (req, res) => {
  const { id } = req.params;

  try {
    const [concert] = await sql`
      SELECT *
      FROM concerts
      WHERE id = ${id}
    `;

    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.json(concert);
  } catch (error) {
    console.error("Error fetching concert:", error);
    res.status(500).json({ message: "Error fetching concert" });
  }
};