const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/buy", authMiddleware, ticketController.buyTickets);
router.get("/my", authMiddleware, ticketController.getMyTickets);

module.exports = router;