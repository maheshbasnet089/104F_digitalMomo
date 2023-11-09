const { createProduct, deleteProduct, editProduct } = require("../../controller/admin/product/productController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")

const router = require("express").Router()
const {multer,storage  } = require("../../middleware/multerConfig")
const catchAsync = require("../../services/catchAsync")
const { getProducts, getProduct } = require("../../controller/global/globalController")
const upload = multer({storage : storage})


// router.post("/products",createProduct)
// router.get("/products",getProducts)

router.route("/")
.post(isAuthenticated,restrictTo("admin"),upload.single('productImage'), catchAsync( createProduct))
.get(catchAsync(getProducts))

router.route("/:id")
.get( catchAsync(getProduct))
.delete( isAuthenticated,restrictTo("admin"), catchAsync(deleteProduct))
.patch(isAuthenticated,restrictTo("admin"),upload.single('productImage'), editProduct)

module.exports = router 