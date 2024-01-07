const DataServices = require("../../controller/admin/misc/dataService")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")

const router = require("express").Router()

router.route("/misc/datas").get(isAuthenticated,restrictTo('admin'), DataServices.getDatas)

module.exports = router 