const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/authModel")

exports.isAuthenticate =  catchAsyncError (async(req,res,next)=>{

        const {token} = req.cookies;

        if(!token){
            return next(new ErrorHandler("Login first to handle this resource",400));
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

       req.user =  await User.findById(decoded.id);

       next();

})