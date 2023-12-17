const { addToCart, getMyCartItems, deleteItemFromCart, updateCartItems } = require("../../controller/user/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()

router.route("/").get(isAuthenticated,catchAsync(getMyCartItems))
router.route("/:productId").post(isAuthenticated,catchAsync(addToCart)).delete(isAuthenticated,catchAsync(deleteItemFromCart)).patch(isAuthenticated,catchAsync(updateCartItems))


module.exports = router 