const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
    registerAdmin,
    loginAdmin,
    viewAllUsers,
    viewUserDetails,
    deleteUser,
} = require("../controllers/adminController");

router.post('/register',registerAdmin);
router.post('/login',loginAdmin);
router.get('/users',auth,viewAllUsers);
router.get('/user/:username',auth,viewUserDetails);
router.delete('/user/:username',auth,deleteUser);

module.exports=router;