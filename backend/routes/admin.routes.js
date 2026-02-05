const express = require("express");
const {
  getDashboard,
  getAllUsers,
  getPendingDoctors,
  verifyDoctor,
  rejectDoctor,
  getPendingPharmacies,
  verifyPharmacy,
  rejectPharmacy,
  deleteUser,
  getAllAppointments,
  getAllOrders,
} = require("../controllers/admin.controller");
const { protect, authorize } = require("../middlewares/auth.middleware"); // ✅ Fixed
const { adminOnly } = require("../middlewares/role.middleware"); // ✅ Fixed

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));
router.use(adminOnly);

router.get("/dashboard", getDashboard);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/doctors/pending", getPendingDoctors);
router.put("/doctors/:id/verify", verifyDoctor);
router.put("/doctors/:id/reject", rejectDoctor);

router.get("/pharmacies/pending", getPendingPharmacies);
router.put("/pharmacies/:id/verify", verifyPharmacy);
router.put("/pharmacies/:id/reject", rejectPharmacy);

router.get("/appointments", getAllAppointments);
router.get("/orders", getAllOrders);

module.exports = router;
