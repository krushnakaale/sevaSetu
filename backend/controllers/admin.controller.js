const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User.model");
const Doctor = require("../models/Doctor.model");
const Pharmacy = require("../models/Pharmacy.model");
const Appointment = require("../models/Appointment.model");
const Order = require("../models/Order.model");
const { sendEmail, emailTemplates } = require("../utils/sendEmail");


// @desc    Get dashboard overview
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboard = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalDoctors = await Doctor.countDocuments();
  const totalPharmacies = await Pharmacy.countDocuments();
  const totalAppointments = await Appointment.countDocuments();
  const totalOrders = await Order.countDocuments();

  const pendingDoctors = await Doctor.countDocuments({
    verificationStatus: "pending",
  });
  const pendingPharmacies = await Pharmacy.countDocuments({
    verificationStatus: "pending",
  });

  const todayAppointments = await Appointment.countDocuments({
    appointmentDate: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    },
  });

  const recentOrders = await Order.find()
    .sort("-createdAt")
    .limit(5)
    .populate("user", "name email")
    .populate("pharmacy", "pharmacyName");

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalDoctors,
        totalPharmacies,
        totalAppointments,
        totalOrders,
        pendingDoctors,
        pendingPharmacies,
        todayAppointments,
      },
      recentOrders,
    },
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { role, search, isActive } = req.query;

  // Build filter
  const filter = {};
  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === "true";
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(filter)
    .select("-password")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: users,
  });
});

// @desc    Get pending doctors for verification
// @route   GET /api/admin/doctors/pending
// @access  Private/Admin
exports.getPendingDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ verificationStatus: "pending" })
    .populate("user", "name email phone avatar")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors,
  });
});

// @desc    Verify doctor
// @route   PUT /api/admin/doctors/:id/verify
// @access  Private/Admin
exports.verifyDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate("user");

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }

  doctor.isVerified = true;
  doctor.verificationStatus = "verified";
  doctor.verifiedBy = req.user._id;
  doctor.verifiedAt = Date.now();

  await doctor.save();

  // Send verification email
  try {
    await sendEmail({
      email: doctor.user.email,
      subject: "Doctor Profile Verified - AIPP Healthcare",
      html: emailTemplates.doctorVerified(doctor.user.name),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }

  res.status(200).json({
    success: true,
    message: "Doctor verified successfully",
    data: doctor,
  });
});

// @desc    Reject doctor
// @route   PUT /api/admin/doctors/:id/reject
// @access  Private/Admin
exports.rejectDoctor = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({
      success: false,
      message: "Please provide rejection reason",
    });
  }

  const doctor = await Doctor.findById(req.params.id).populate("user");

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }

  doctor.verificationStatus = "rejected";
  doctor.rejectionReason = reason;

  await doctor.save();

  // Send rejection email
  try {
    await sendEmail({
      email: doctor.user.email,
      subject: "Doctor Profile Verification Update",
      html: emailTemplates.doctorRejected(doctor.user.name, reason),
    });
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }

  res.status(200).json({
    success: true,
    message: "Doctor rejected",
    data: doctor,
  });
});

// @desc    Get pending pharmacies for verification
// @route   GET /api/admin/pharmacies/pending
// @access  Private/Admin
exports.getPendingPharmacies = asyncHandler(async (req, res) => {
  const pharmacies = await Pharmacy.find({ verificationStatus: "pending" })
    .populate("user", "name email phone")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies,
  });
});

// @desc    Verify pharmacy
// @route   PUT /api/admin/pharmacies/:id/verify
// @access  Private/Admin
exports.verifyPharmacy = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findById(req.params.id).populate("user");

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy not found",
    });
  }

  pharmacy.isVerified = true;
  pharmacy.verificationStatus = "verified";
  pharmacy.verifiedBy = req.user._id;
  pharmacy.verifiedAt = Date.now();

  await pharmacy.save();

  // Send verification email
  try {
    await sendEmail({
      email: pharmacy.user.email,
      subject: "Pharmacy Verified - AIPP Healthcare",
      html: emailTemplates.pharmacyVerified(pharmacy.pharmacyName),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }

  res.status(200).json({
    success: true,
    message: "Pharmacy verified successfully",
    data: pharmacy,
  });
});

// @desc    Reject pharmacy
// @route   PUT /api/admin/pharmacies/:id/reject
// @access  Private/Admin
exports.rejectPharmacy = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({
      success: false,
      message: "Please provide rejection reason",
    });
  }

  const pharmacy = await Pharmacy.findById(req.params.id).populate("user");

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy not found",
    });
  }

  pharmacy.verificationStatus = "rejected";
  pharmacy.rejectionReason = reason;

  await pharmacy.save();

  res.status(200).json({
    success: true,
    message: "Pharmacy rejected",
    data: pharmacy,
  });
});

// @desc    Delete/Deactivate user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Soft delete - deactivate instead of removing
  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User deactivated successfully",
  });
});

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private/Admin
exports.getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name email phone")
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name email" },
    })
    .sort("-createdAt")
    .limit(50);

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .populate("pharmacy", "pharmacyName contactNumber")
    .sort("-createdAt")
    .limit(50);

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});
