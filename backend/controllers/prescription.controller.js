// controllers/prescription.controller.js
const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order.model");

// @desc    Upload prescription for an order
// @route   POST /api/prescriptions
// @access  Private
exports.uploadPrescription = asyncHandler(async (req, res) => {
  const { notes } = req.body;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "File is required" });
  }

  // Create a new prescription object
  const prescription = {
    file: file.path,
    notes: notes || "",
    uploadedBy: req.user._id,
    uploadedAt: new Date(),
  };

  // Optionally, attach prescription to an order
  // e.g., await Order.findByIdAndUpdate(orderId, { prescription });

  res.status(201).json({
    success: true,
    message: "Prescription uploaded successfully",
    data: prescription,
  });
});
