const mongoose = require("mongoose")
const User = require("../model/userModel")
const adminSeeder = require("../adminSeeder")


exports.connectDatabase = async(URI)=>{
    // connecting to database 
// jaba samma database sanga connect hudainw wait gar
 await mongoose.connect(URI)
 console.log("Database connected successfully")
 // admin seeding function
 adminSeeder()

}