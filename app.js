const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()

const { registerUser, loginUser } = require("./controller/auth/authController")

//ROUTES HERE
const authRoute = require("./routes/authRoute")

//Routes end here



// TELL NODE TO USE DOTENV
require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended : true}))

//DATABASE CONNECTION
connectDatabase(process.env.MONGO_URI)

 //test api to check if server is live or not
app.get("/",(req,res)=>{
    res.status(200).json({
       
        message : "I am alive"
    })
})

app.use("",authRoute)
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
