const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()

const { registerUser, loginUser } = require("./controller/auth/authController")

//ROUTES HERE
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const adminUsersRoute = require("./routes/adminUsersRoute")

//Routes end here



// TELL NODE TO USE DOTENV
require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended : true}))

// telling nodejs to give access to uploads folder 
app.use(express.static("./uploads"))

//DATABASE CONNECTION
connectDatabase(process.env.MONGO_URI)

 //test api to check if server is live or not
app.get("/",(req,res)=>{
    res.status(200).json({
       
        message : "I am alive"
    })
})

app.use("/api",authRoute)
app.use("/api",productRoute)
app.use("/api",adminUsersRoute)
// // /register ->
// // /login
// app.use("/hello",authRoute)
// /hello/register
// /hello/login


const PORT = process.env.PORT
//listen server 
app.listen(PORT,()=>{
    console.log(`Server has started at PORT ${PORT} ` )
})
