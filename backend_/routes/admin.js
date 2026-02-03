const express = require("express");
const {
  getAllUsers,
  deleteUser,
  toggleUserStatus,
} = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/users/:id/status", verifyToken, verifyAdmin, toggleUserStatus);

module.exports = router;
