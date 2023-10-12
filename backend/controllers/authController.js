const User = require("../models/authModel");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/sendToken")

//  user registration

exports.register =  catchAsyncError( async (req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
                name,
                email,
                password
        })

        sendToken(user,201,res)
})

//user login user 

exports.loginUser = catchAsyncError( async(req,res,next)=>{

    const {email,password} =req.body;

    if(!email || !password){ 
        return next(new ErrorHandler("Enter email or password",400))
   } 

    const user = await User.findOne({email}).select("+password")

     if(!user){
          return next(new ErrorHandler("User not found",400))
    } 

    if(! await user.verifyPassword(password)){
            return next(new ErrorHandler("Invalid password",400));
    } 

    sendToken(user,200,res)
})

//logout user


exports.logoutUser =catchAsyncError( async(req,res,next)=>{

    const options ={
        expires : new Date(Date.now()),
        httpOnly : true
    }
    res.status(200).cookie('token',null,options)
    .json({
        success :true,
        message:"Logged out Successfully"
    })
})

exports.getUser = catchAsyncError(async(req,res,next)=>{

        const user = await User.findById(req.user.id)

    res.status(200).json({
        success :true,
        user
    })
})


//get all the user

exports.getAllUsers = catchAsyncError(async (req,res,next)=>{

    const user = await User.find()


    res.status(200).json({
        success :true,
        count :user.length,
        user
    })
})