// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(protect);
router.use(roleMiddleware("admin"));

router.post("/concerts", adminController.createConcert);
router.put("/concerts/:id", adminController.updateConcert);
router.delete("/concerts/:id", adminController.deleteConcert);
router.get("/concerts", adminController.getAllConcertsAdmin);

router.get("/data", adminController.getAdminData);

module.exports = router;