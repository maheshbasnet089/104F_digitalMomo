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

exports.getSingleOrder = async(req,res)=>{
    const {id} = req.params 
    // check if order exist or not 
    const order= await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message : "No order found with that id"
        })
    }
    res.status(200).json({
        message : "Order fetched successfully",
        data : order
    })
}

exports.updateOrderStatus = async(req,res)=>{
    const {id} = req.params 
    const {orderStatus} = req.body 

    if(!orderStatus || !['pending','delivered','cancelled','ontheway','preparation'].includes(orderStatus.toLowerCase())){
        return res.status(400).json({
            message : "orderStatus is invalid or should be provided"
        })
    }
    const order= await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message : "No order found with that id"
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        orderStatus
    },{new:true})

    res.status(200).json({
        message : "Order status updated Successfully",
        data : updatedOrder
    })
}

exports.deleteOrder = async(req,res)=>{
    const {id} = req.params 
    const order= await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message : "No order found with that id"
        })
    }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message : "Order deleted successfully",
        data : null
    })
}