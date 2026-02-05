// routes/prescription.routes.js
const express = require("express");
const multer = require("multer");
const { protect } = require("../middlewares/auth.middleware");
const {
  uploadPrescription,
} = require("../controllers/prescription.controller");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/prescriptions/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", protect, upload.single("prescription"), uploadPrescription);

module.exports = router;
