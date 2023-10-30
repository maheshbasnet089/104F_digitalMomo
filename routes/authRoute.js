const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require("../controller/auth/authController")

const router = require("express").Router()

// routes here 
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword)
router.route("/verifyOtp").post(verifyOtp)
router.route("/resetPassword").post(resetPassword)


module.exports = router 