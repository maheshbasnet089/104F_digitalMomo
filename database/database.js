const mongoose = require("mongoose")


exports.connectDatabase = async(URI)=>{
    // connecting to database 
// jaba samma database sanga connect hudainw wait gar
 await mongoose.connect(URI)
 console.log("Database connected successfully")
}