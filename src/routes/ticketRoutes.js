const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

// Rutas protegidas
router.post("/buy", protect, ticketController.buyTickets);
router.get("/my", protect, ticketController.getMyTickets);

module.exports = router;