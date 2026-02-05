const express = require("express");
const {
  createOrUpdateProfile,
  getProfile,
  getAllDoctors,
  getDoctorById,
  getAppointments,
  updateAppointmentStatus,
  addPrescription,
  updateAvailability,
  getDashboard,
} = require("../controllers/doctor.controller");
const { protect, authorize } = require("../middlewares/auth.middleware"); // ✅ Fixed
const { checkDoctorVerification } = require("../middlewares/role.middleware"); // ✅ Fixed

const router = express.Router();

router.get("/all", getAllDoctors);
router.get("/:id", getDoctorById);

router.use(protect);
router.use(authorize("doctor"));

router.post("/profile", createOrUpdateProfile);
router.get("/profile/me", getProfile);

router.get("/dashboard", checkDoctorVerification, getDashboard);
router.get("/appointments", checkDoctorVerification, getAppointments);
router.put(
  "/appointments/:id/status",
  checkDoctorVerification,
  updateAppointmentStatus,
);
router.post(
  "/appointments/:id/prescription",
  checkDoctorVerification,
  addPrescription,
);
router.put("/availability", checkDoctorVerification, updateAvailability);

module.exports = router;
