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
         await Products.create({
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

exports.getProducts = async(req,res)=>{
 
    const products = await Product.find()
    if(products.length == 0 ){
        res.status(400).json({
            message : "No product Found",
            products : []
        })
    }else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            products  
        })
    }
   
}


exports.getProduct = async(req ,res)=>{

        const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id(productId)"
        })
    }
    const product = await Product.find({_id : id})
    if(product.length == 0){
        res.status(400).json({
            message : "No product found with that id",
            product : []
        })
    }else{
        res.status(200).json({
            message : "Product fetched successfully",
            product 
        })
    }
 
}