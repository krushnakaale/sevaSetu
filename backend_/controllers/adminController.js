const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// BAN / UNBAN USER
exports.toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.status = user.status === "Active" ? "Banned" : "Active";
  await user.save();
  res.json({ status: user.status });
};
