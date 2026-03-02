const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(protect); // valida el JWT
router.use(roleMiddleware("admin")); // valida que sea admin

router.post("/concerts", adminController.createConcert);
router.put("/concerts/:id", adminController.updateConcert);
router.delete("/concerts/:id", adminController.deleteConcert);
router.get("/concerts", adminController.getAllConcertsAdmin);

module.exports = router;