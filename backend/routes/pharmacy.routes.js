const express = require("express");
const {
  createOrUpdateProfile,
  getProfile,
  getAllPharmacies,
  getPharmacyById,
  getOrders,
  updateOrderStatus,
  verifyPrescription,
  getDashboard,
  updateAvailability,
} = require("../controllers/pharmacy.controller");
const { protect, authorize } = require("../middlewares/auth.middleware"); // ✅ Fixed
const { checkPharmacyVerification } = require("../middlewares/role.middleware"); // ✅ Fixed

const router = express.Router();

router.get("/all", getAllPharmacies);
router.get("/:id", getPharmacyById);

router.use(protect);
router.use(authorize("pharmacy"));

router.post("/profile", createOrUpdateProfile);
router.get("/profile/me", getProfile);

router.get("/dashboard", checkPharmacyVerification, getDashboard);
router.get("/orders", checkPharmacyVerification, getOrders);
router.put("/orders/:id/status", checkPharmacyVerification, updateOrderStatus);
router.put(
  "/orders/:id/verify-prescription",
  checkPharmacyVerification,
  verifyPrescription,
);
router.put("/availability", checkPharmacyVerification, updateAvailability);

module.exports = router;
