const { getMyReviews, deleteReview, createReview } = require("../../controller/user/review/reviewController")

const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router( )

// router.route("/reviews")
router.route("/").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/:id").delete(isAuthenticated,catchAsync( deleteReview)).post(isAuthenticated,restrictTo("user"),catchAsync(createReview))

module.exports = router

