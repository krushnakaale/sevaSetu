const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order.model");
const Pharmacy = require("../models/Pharmacy.model");
const { sendEmail, emailTemplates } = require("../utils/sendEmail");


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res) => {
  const {
    pharmacy,
    items,
    prescription,
    deliveryAddress,
    pricing,
    paymentMethod,
  } = req.body;

  // Validate required fields
  if (
    !pharmacy ||
    !items ||
    items.length === 0 ||
    !deliveryAddress ||
    !pricing
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required order details",
    });
  }

  // Check if pharmacy exists and is verified
  const pharmacyDoc = await Pharmacy.findById(pharmacy);
  if (!pharmacyDoc || !pharmacyDoc.isVerified || !pharmacyDoc.isActive) {
    return res.status(400).json({
      success: false,
      message: "Pharmacy is not available",
    });
  }

  // Create order
  const order = await Order.create({
    user: req.user._id,
    pharmacy,
    items,
    prescription: prescription || { required: false },
    deliveryAddress,
    pricing,
    paymentMethod: paymentMethod || "cod",
    orderStatus: "pending",
    paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
  });

  // Add initial status to history
  order.statusHistory.push({
    status: "pending",
    timestamp: new Date(),
    note: "Order placed successfully",
  });

  await order.save();

  // Populate order details
  await order.populate("pharmacy", "pharmacyName contactNumber");

  // Send confirmation email
  try {
    await sendEmail({
      email: req.user.email,
      subject: "Order Confirmation - AIPP Healthcare",
      html: emailTemplates.orderConfirmation(
        req.user.name,
        order.orderNumber,
        order.pricing.total,
      ),
    });
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email phone")
    .populate("pharmacy", "pharmacyName contactNumber address");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Check ownership
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    // If pharmacy, check if order belongs to them
    if (req.user.role === "pharmacy") {
      const pharmacy = await Pharmacy.findOne({ user: req.user._id });
      if (order.pharmacy._id.toString() !== pharmacy._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to access this order",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this order",
      });
    }
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Check ownership
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this order",
    });
  }

  // Check if order can be cancelled
  if (["delivered", "cancelled"].includes(order.orderStatus)) {
    return res.status(400).json({
      success: false,
      message: `Order cannot be cancelled. Current status: ${order.orderStatus}`,
    });
  }

  order.orderStatus = "cancelled";
  order.cancelledBy = "user";
  order.cancellationReason = reason || "Cancelled by user";

  order.statusHistory.push({
    status: "cancelled",
    timestamp: new Date(),
    note: reason || "Cancelled by user",
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
});

// @desc    Rate order
// @route   POST /api/orders/:id/rate
// @access  Private
exports.rateOrder = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid rating (1-5)",
    });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Check ownership
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to rate this order",
    });
  }

  // Check if order is delivered
  if (order.orderStatus !== "delivered") {
    return res.status(400).json({
      success: false,
      message: "Can only rate delivered orders",
    });
  }

  // Check if already rated
  if (order.rating) {
    return res.status(400).json({
      success: false,
      message: "Order already rated",
    });
  }

  order.rating = rating;
  order.review = review || "";
  await order.save();

  // Update pharmacy rating
  const pharmacy = await Pharmacy.findById(order.pharmacy);
  if (pharmacy) {
    const totalRatings = pharmacy.totalRatings + 1;
    const newRating =
      (pharmacy.rating * pharmacy.totalRatings + rating) / totalRatings;

    pharmacy.rating = parseFloat(newRating.toFixed(1));
    pharmacy.totalRatings = totalRatings;
    await pharmacy.save();
  }

  res.status(200).json({
    success: true,
    message: "Thank you for rating!",
    data: order,
  });
});

// @desc    Track order
// @route   GET /api/orders/:id/track
// @access  Private
exports.trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("pharmacy", "pharmacyName contactNumber")
    .select(
      "orderNumber orderStatus statusHistory estimatedDelivery deliveredAt",
    );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Check ownership
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to track this order",
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Reorder
// @route   POST /api/orders/:id/reorder
// @access  Private
exports.reorder = asyncHandler(async (req, res) => {
  const previousOrder = await Order.findById(req.params.id);

  if (!previousOrder) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Check ownership
  if (previousOrder.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to reorder",
    });
  }

  res.status(200).json({
    success: true,
    message: "Previous order details fetched. Please review and place order.",
    data: {
      items: previousOrder.items,
      pharmacy: previousOrder.pharmacy,
      deliveryAddress: previousOrder.deliveryAddress,
    },
  });
});
