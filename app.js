const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()

const {Server} =  require("socket.io")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const {promisify} = require("util")

//ROUTES HERE
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/profileRoute")
const cartRoute = require("./routes/user/cartRoute")
const orderRoute = require("./routes/user/orderRoute")
const adminOrdersRoute = require("./routes/admin/adminOrderRoute")
const paymentRoute = require("./routes/user/paymentRoute")
const dataServiceRoute = require("./routes/admin/dataServiceRoute")


const User = require("./model/userModel")

//Routes end here

app.use(cors({
    origin : '*'
}))

// TELL NODE TO USE DOTENV
require("dotenv").config()

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// telling nodejs to give access to uploads folder 
app.use(express.static("./uploads"))

//DATABASE CONNECTION
connectDatabase(process.env.MONGO_URI)

app.get("/chat",(req,res)=>{
    res.render("home.ejs")
})
 //test api to check if server is live or not
app.get("/",(req,res)=>{
    res.status(200).json({
       
        message : "I am alive"
    })
})

app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/admin",adminOrdersRoute)
app.use("/api/admin",dataServiceRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/payment",paymentRoute)
// app.use("/hello",authRoute)
// /hello/register
// /hello/login


const PORT = process.env.PORT
//listen server 
const server = app.listen(3000,()=>{
    console.log(`Server has started at PORT ${PORT} ` )
})
const io = new Server(server,{
    cors : ["https://104-f-digital-momoadmin.vercel.app/","https://104f-digital-momo-frontend.vercel.app/"]
})

let onlineUsers = []

const addToOnlineUsers = (socketId,userId,role)=>{
   onlineUsers =  onlineUsers.filter((user)=>user.userId !== userId)
    onlineUsers.push({socketId,userId,role})
    console.log(onlineUsers)
}

io.on("connection",async (socket)=>{
   // take the token and validate it 
   const {token} = socket.handshake.auth 
   if(token){
        // validate the token 
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
        const doesUserExist =  await User.findOne({_id : decoded.id})
       if(doesUserExist){
        addToOnlineUsers(socket.id,doesUserExist.id,doesUserExist.role)
       }

   }

   socket.on("updateOrderStatus",({status,orderId,userId})=>{
     const findUser = onlineUsers.find((user)=>user.userId == userId)
    
     io.to(findUser.socketId).emit("statusUpdated",{status,orderId})
   })

})



















// io.on("connection",(socket)=>{
//  socket.on("register",async (data)=>{
//     const {username,phoneNumber,email,password} = data
//     // await User.create({
//     //     userName : username,
//     //     userPhoneNumber : phoneNumber,
//     //     userEmail : email,
//     //     userPassword : password
//     // })
//     // io.emit('response',{message : "User REgistered"})
//     io.to(socket.id).emit('response',{message : "user registered"})
//  })

// })
function getSocketIo(){
    return io 
}

module.exports.getSocketIo = getSocketIo
