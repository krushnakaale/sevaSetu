const express = require("express");
const {
  getAllMedicines,
  getMedicineById,
  searchMedicines,
} = require("../controllers/medicine.controller");
const { optionalAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes (with optional auth)
router.get("/", optionalAuth, getAllMedicines);
router.get("/search", optionalAuth, searchMedicines);
router.get("/:id", optionalAuth, getMedicineById);

module.exports = router;
