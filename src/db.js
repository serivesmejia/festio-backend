const postgres = require("postgres");

const sql = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
  prepare: false, // Required for Supabase pooler (pgBouncer mode)
});

module.exports = sql;