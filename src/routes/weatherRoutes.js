const express = require("express");
const router = express.Router();
const weatherService = require("../services/weatherService");

router.get("/:city", async (req, res) => {
  try {
    const data = await weatherService.getWeather(req.params.city);
    res.json(data);
  } catch {
    res.status(500).json({ message: "Weather error" });
  }
});

module.exports = router;