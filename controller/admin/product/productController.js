const Product = require("../../../model/productModel")


exports.createProduct = async (req,res)=>{

  const file = req.file
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
   await Product.create({
        productName ,
        productDescription ,
        productPrice,
        productStatus,
        productStockQty,
        productImage : "http://localhost:3000/" +  filePath

    })
    res.status(200).json({
        message : "Product Created Successfully"
    })
}