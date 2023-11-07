const { getProductReview, createReview, deleteReview, addProductReview } = require("../controller/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router( )

// router.route("/reviews")
router.route("/reviews/:id").get(getProductReview).delete(isAuthenticated,deleteReview).post(isAuthenticated, catchAsync(addProductReview))

module.exports = router

