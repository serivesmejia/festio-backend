const pool = require("../db");

// GET /concerts?page=1&limit=5
exports.getConcerts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const concerts = await pool.query(
      "SELECT * FROM concerts ORDER BY fecha DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const total = await pool.query("SELECT COUNT(*) FROM concerts");

    res.json({
      page,
      limit,
      total: parseInt(total.rows[0].count),
      data: concerts.rows
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching concerts" });
  }
};

// GET /concerts/:id
exports.getConcertById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM concerts WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error fetching concert" });
  }
};