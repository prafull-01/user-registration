const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let user = await User.findOne({ email}) || await User.findOne({username});
    if(user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, username, password });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    // await sendEmail({
    //   email: user.email,
    //   subject: "Account Verification",
    //   message: `Your OTP is ${otp}. Please enter this OTP to verify your account`,
    // });
    res.json({ message: "Registration successful. Check your email for OTP" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//verify user
const verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.isVerified = true;
    await user.save();
    res.json({ message: "Account verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//add Extra info
const addExtraInfo = async (req, res) => {
  const { email, location, age, work, DOB, description } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not find" });
    }
    user.location = location;
    user.age = age;
    user.work = work;
    user.DOB = DOB;
    user.description = description;
    await user.save();
    res.json({ message: "User info Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "Hello@1234#$%");
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get user info
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update user info
const updateUserInfo = async (req, res) => {
  const { location, age, work, DOB, description } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.location = location || user.location;
    user.age = age || user.age;
    user.work = work || user.work;
    user.DOB = DOB || user.DOB;
    user.description = description || user.description;
    await user.save();
    res.json({ message: "User info updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  verifyUser,
  addExtraInfo,
  loginUser,
  getUserInfo,
  updateUserInfo,
};
