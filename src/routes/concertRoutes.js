const express = require("express");
const router = express.Router();
const concertController = require("../controllers/concertController");

// Públicas
router.get("/", concertController.getConcerts);
router.get("/:id", concertController.getConcertById);

module.exports = router;