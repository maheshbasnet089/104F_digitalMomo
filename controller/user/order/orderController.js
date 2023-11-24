const Order = require("../../../model/orderSchema")

exports.createOrder = async(req,res)=>{
 const userId = req.user.id
    const {shippingAddress,items,totalAmount,paymentDetails} = req.body 
    if(!shippingAddress || !items.length > 0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message : "Please provide shippingAddress,items,totalAmount,paymentDetails"
        })
    }
    // insert into orders 
    await Order.create({
        user : userId,
        shippingAddress,
        totalAmount,
        items,
        paymentDetails
    })
    res.status(200).json({
        message : "Order created successfully"
    })

}
exports.getMyOrders = async(req,res)=>{
    const userId = req.user.id
    const orders = await Order.find({user : userId}).populate({
        path:"items.product",
        model : "Product",
        select : "-productStockQty -createdAt -updatedAt -reviews -__v"
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