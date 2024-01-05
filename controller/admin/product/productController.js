const Order = require("../../../model/orderSchema")
const Product = require("../../../model/productModel")
const fs = require("fs")


exports.createProduct = async (req,res)=>{

        const file = req.file
        console.log(file)
        let filePath
         if(!file){
          filePath ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dQPM88-Vq0f-YM8xILMQdKktXgKBMN6XH9cCBleA&s"
         }else{
          filePath = req.file.filename
         }
          const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
          if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
              return res.status(400).json({
                  message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty"
              })
          }
          // insert into the Product collection/table
        const productCreated =  await Product.create({
              productName ,
              productDescription ,
              productPrice,
              productStatus,
              productStockQty,
              productImage : process.env.BACKEND_URL +  filePath
      
          })
          res.status(200).json({
              message : "Product Created Successfully",
              data : productCreated
          })
 

}



exports.deleteProduct =  async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
 
    const oldProductImage = oldData.productImage // http://localhost:3000/1698943267271-bunImage.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) 
         // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    await Product.findByIdAndDelete(id)
    res.status(200).json({

        message : "Product delete successfully"
    })

}

exports.editProduct = async(req,res)=>{

    const {id} = req.params 
      const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
      if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty,id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
 
    const oldProductImage = oldData.productImage // http://localhost:3000/1698943267271-bunImage.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // 1698943267271-bunImage.png
    if(req.file && req.file.filename){
        // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    }
   const datas =  await Product.findByIdAndUpdate(id,{
        productName ,
        productDescription ,
        productPrice,
        productStatus,
        productStockQty,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL +  req.file.filename :  oldProductImage
    },{
        new : true,
    
    })
    res.status(200).json({
        messagee : "Product updated successfully",
        data : datas
    })
}

exports.updateProductStatus = async(req,res)=>{
    const {id} = req.params 
    const {productStatus} = req.body 

    if(!productStatus || !['available','unavailable'].includes(productStatus.toLowerCase())){
        return res.status(400).json({
            message : "productStatus is invalid or should be provided"
        })
    }
    const product= await Product.findById(id)
    if(!product){
        return res.status(404).json({
            message : "No product found with that id"
        })
    }
    const updatedProduct = await Product.findByIdAndUpdate(id,{
          productStatus
    },{new:true})

    res.status(200).json({
        message : "product status updated Successfully",
        data : updatedProduct
    })
}

exports.updateProductStockAndPrice =  
async(req,res)=>{
    const {id} = req.params 
    const {productStockQty,productPrice} = req.body 

    if(!productStockQty && !productPrice){
        return res.status(400).json({
            message : "Please provide productStockQty or productPrice"
        })
    }
    const product= await Product.findById(id)
    if(!product){
        return res.status(404).json({
            message : "No product found with that id"
        })
    }
    const updatedProduct = await Product.findByIdAndUpdate(id,{
        productStockQty : productStockQty ? productStockQty : product.productStockQty,
        productPrice : productPrice ? productPrice : product.productPrice
    },{new:true})

    res.status(200).json({
        message : "product status updated Successfully",
        data : updatedProduct
    })
}

exports.getOrdersOfAProduct = async(req,res)=>{
    const {id:productId} = req.params

    // check if this productExist or not 
    const product = await Product.findById(productId)
    if(!product ){
       return res.status(400).json({
            message : "No product Found"
        })
    }
    const orders = await Order.find({'items.product' : productId})
    console.log(orders)

    res.status(200).json({
        message : "Product ORdres fetched",
        data : orders
    })
}