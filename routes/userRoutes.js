const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  registerUser,
  verifyUser,
  addExtraInfo,
  loginUser,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController");

router.post('/register',registerUser);
router.post('/verify',verifyUser);
router.post('/add-info',addExtraInfo);
router.post('/login',loginUser);
router.get('/user-info',auth,getUserInfo);
router.put('/update',auth,updateUserInfo);

module.exports=router;

