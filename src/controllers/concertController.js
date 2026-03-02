const pool = require("../db");

exports.getConcerts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const concerts = await pool.query(
    "SELECT * FROM concerts LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const total = await pool.query("SELECT COUNT(*) FROM concerts");

  res.json({
    page,
    limit,
    total: total.rows[0].count,
    data: concerts.rows
  });
};