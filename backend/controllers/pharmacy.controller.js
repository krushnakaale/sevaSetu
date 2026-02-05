const asyncHandler = require("../utils/asyncHandler");
const Pharmacy = require("../models/Pharmacy.model");
const User = require("../models/User.model");
const Order = require("../models/Order.model");

// @desc    Create/Update pharmacy profile
// @route   POST /api/pharmacy/profile
// @access  Private/Pharmacy
exports.createOrUpdateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check if profile already exists
  let pharmacy = await Pharmacy.findOne({ user: userId });

  const profileData = {
    user: userId,
    pharmacyName: req.body.pharmacyName,
    licenseNumber: req.body.licenseNumber,
    gstNumber: req.body.gstNumber,
    address: req.body.address,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    operatingHours: req.body.operatingHours,
    workingDays: req.body.workingDays,
    serviceType: req.body.serviceType,
    deliveryRadius: req.body.deliveryRadius,
    minimumOrderAmount: req.body.minimumOrderAmount,
    deliveryCharges: req.body.deliveryCharges,
    documents: req.body.documents,
  };

  if (pharmacy) {
    // Update existing profile
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== undefined) {
        pharmacy[key] = profileData[key];
      }
    });
    await pharmacy.save();
  } else {
    // Create new profile
    pharmacy = await Pharmacy.create(profileData);

    // Update user role to pharmacy
    await User.findByIdAndUpdate(userId, { role: "pharmacy" });
  }

  res.status(200).json({
    success: true,
    message: pharmacy.isNew
      ? "Pharmacy profile created successfully. Waiting for admin verification."
      : "Pharmacy profile updated successfully",
    data: pharmacy,
  });
});

// @desc    Get pharmacy profile
// @route   GET /api/pharmacy/profile
// @access  Private/Pharmacy
exports.getProfile = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id }).populate(
    "user",
    "name email phone",
  );

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  res.status(200).json({
    success: true,
    data: pharmacy,
  });
});

// @desc    Get all pharmacies (for users to browse)
// @route   GET /api/pharmacy/all
// @access  Public
exports.getAllPharmacies = asyncHandler(async (req, res) => {
  const { city, search, serviceType, page = 1, limit = 12 } = req.query;

  const skip = (page - 1) * limit;

  // Build filter - only show verified and active pharmacies
  const filter = {
    isVerified: true,
    verificationStatus: "verified",
    isActive: true,
  };

  if (city) filter["address.city"] = { $regex: city, $options: "i" };
  if (serviceType) filter.serviceType = serviceType;
  if (search) {
    filter.$or = [
      { pharmacyName: { $regex: search, $options: "i" } },
      { "address.city": { $regex: search, $options: "i" } },
    ];
  }

  const pharmacies = await Pharmacy.find(filter)
    .select("-documents -verificationStatus")
    .sort("-rating -totalOrders")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Pharmacy.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: pharmacies,
  });
});

// @desc    Get pharmacy by ID
// @route   GET /api/pharmacy/:id
// @access  Public
exports.getPharmacyById = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findById(req.params.id).select(
    "-documents -verificationStatus",
  );

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy not found",
    });
  }

  // Only show if verified and active
  if (!pharmacy.isVerified || !pharmacy.isActive) {
    return res.status(403).json({
      success: false,
      message: "Pharmacy is not available",
    });
  }

  res.status(200).json({
    success: true,
    data: pharmacy,
  });
});

// @desc    Get pharmacy orders
// @route   GET /api/pharmacy/orders
// @access  Private/Pharmacy (Verified)
exports.getOrders = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  const { status, date, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { pharmacy: pharmacy._id };
  if (status) filter.orderStatus = status;
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: startDate, $lte: endDate };
  }

  const orders = await Order.find(filter)
    .populate("user", "name email phone address")
    .sort("-createdAt")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: orders,
  });
});

// @desc    Update order status
// @route   PUT /api/pharmacy/orders/:id/status
// @access  Private/Pharmacy (Verified)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Please provide order status",
    });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Verify pharmacy owns this order
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });
  if (order.pharmacy.toString() !== pharmacy._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this order",
    });
  }

  // Update status
  order.orderStatus = status;

  // Add to status history
  order.statusHistory.push({
    status,
    timestamp: new Date(),
    note: note || "",
  });

  // If delivered, set delivery date
  if (status === "delivered") {
    order.deliveredAt = new Date();
    order.paymentStatus = "paid";
  }

  await order.save();

  // Update pharmacy total orders if completed
  if (status === "delivered") {
    pharmacy.totalOrders += 1;
    await pharmacy.save();
  }

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
});

// @desc    Verify prescription
// @route   PUT /api/pharmacy/orders/:id/verify-prescription
// @access  Private/Pharmacy (Verified)
exports.verifyPrescription = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Verify pharmacy owns this order
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });
  if (order.pharmacy.toString() !== pharmacy._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to verify this prescription",
    });
  }

  if (!order.prescription.required) {
    return res.status(400).json({
      success: false,
      message: "This order does not require prescription",
    });
  }

  order.prescription.verifiedBy = pharmacy._id;
  order.orderStatus = "confirmed";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Prescription verified successfully",
    data: order,
  });
});

// @desc    Get pharmacy dashboard stats
// @route   GET /api/pharmacy/dashboard
// @access  Private/Pharmacy (Verified)
exports.getDashboard = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  const totalOrders = await Order.countDocuments({ pharmacy: pharmacy._id });

  const pendingOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
    orderStatus: { $in: ["pending", "confirmed"] },
  });

  const todayOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    },
  });

  const deliveredOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
    orderStatus: "delivered",
  });

  // Calculate total revenue
  const revenueData = await Order.aggregate([
    { $match: { pharmacy: pharmacy._id, orderStatus: "delivered" } },
    { $group: { _id: null, total: { $sum: "$pricing.total" } } },
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

  const recentOrders = await Order.find({ pharmacy: pharmacy._id })
    .populate("user", "name email phone")
    .sort("-createdAt")
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      pharmacyInfo: pharmacy,
      stats: {
        totalOrders,
        pendingOrders,
        todayOrders,
        deliveredOrders,
        totalRevenue,
        rating: pharmacy.rating,
        totalRatings: pharmacy.totalRatings,
      },
      recentOrders,
    },
  });
});

// @desc    Update pharmacy availability
// @route   PUT /api/pharmacy/availability
// @access  Private/Pharmacy (Verified)
exports.updateAvailability = asyncHandler(async (req, res) => {
  const { isActive, operatingHours, workingDays } = req.body;

  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  if (isActive !== undefined) pharmacy.isActive = isActive;
  if (operatingHours) pharmacy.operatingHours = operatingHours;
  if (workingDays) pharmacy.workingDays = workingDays;

  await pharmacy.save();

  res.status(200).json({
    success: true,
    message: "Availability updated successfully",
    data: pharmacy,
  });
});
