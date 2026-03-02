const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Todas protegidas
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.post("/concerts", adminController.createConcert);
router.put("/concerts/:id", adminController.updateConcert);
router.delete("/concerts/:id", adminController.deleteConcert);
router.get("/concerts", adminController.getAllConcertsAdmin);

module.exports = router;