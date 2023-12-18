const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    items : [{
        quantity  : {type:Number,required:true},
        product : {type:mongoose.Schema.Types.ObjectId,ref:"Product",required : true}
    }],
    totalAmount : {type:Number,required:true},
    shippingAddress : {type:String, required:true},
    phoneNumber : {type:Number,required : true},
    orderStatus : {
        type:String,
        enum : ['pending','delivered','cancelled','ontheway','preparation'],
        default : 'pending'
    },
    paymentDetails : {
        pidx : {type:String},
        method:{type:String,enum:['COD','khalti']},
        status : {type : String,enum:['paid','unpaid','pending'],default : 'pending'}
    }
},{
    timestamps : true
})

const Order = mongoose.model("Order",orderSchema)
module.exports = Order