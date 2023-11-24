const { getMyOrders, createOrder } = require("../../controller/user/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


router.route("/").get(isAuthenticated,catchAsync(getMyOrders)).post(isAuthenticated,catchAsync(createOrder))


module.exports = router