require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const concertRoutes = require("./routes/concertRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);

app.use("/auth", authRoutes);
app.use("/concerts", concertRoutes);
app.use("/weather", weatherRoutes);

// Middleware error centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;