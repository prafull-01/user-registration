const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registerAdmin
const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let admin =await Admin.findOne({ email }) || await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: "Admin already exits" });

    admin = new Admin({ email, username, password });
    await admin.save();
    res.json({ message: "Registration successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = { admin: { id: admin.id } };
    const token = jwt.sign(payload, "Hello@1234#$%");
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//view all users
const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//view details of a user
const viewUserDetails = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({ message: "User deleted " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  viewAllUsers,
  viewUserDetails,
  deleteUser,
};
