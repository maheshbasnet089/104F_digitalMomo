const Order = require("../../../model/orderSchema")

exports.getAllOrders = async(req,res)=>{
  
    const orders = await Order.find().populate({
        path:"items.product",
        model : "Product"
    })
    if(orders.length == 0 ){
        return res.status(404).json({
            message : "No orders",
            data : []
        })
    }
    res.status(200).json({
        message : "Orders Fetched Successfully",
        data : orders
    })
}