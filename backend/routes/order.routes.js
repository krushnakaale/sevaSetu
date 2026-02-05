const express = require("express");
const {
  createOrder,
  getOrderById,
  cancelOrder,
  rateOrder,
  trackOrder,
  reorder,
} = require("../controllers/order.controller");
const { protect } = require("../middlewares/auth.middleware"); // ✅ Fixed

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);
router.post("/:id/rate", rateOrder);
router.get("/:id/track", trackOrder);
router.post("/:id/reorder", reorder);

module.exports = router;
