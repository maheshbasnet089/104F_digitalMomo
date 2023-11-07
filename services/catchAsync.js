// catch asynchronous error

module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            console.log(err)
            return res.status(500).json({
                message : err.message,
                fullError: err
            })
        })
    }
}