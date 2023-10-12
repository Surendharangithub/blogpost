const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Enter your name"]
    },
    email:{
        type: String,
        required : [true,"Enter your email address"],
        validate : [validator.isEmail,"Check your email address!"],
        unique : true
    },
    password:{
        type:String,
        required :[true,"Please enter your password"],
        maxlength : [8,"Password cannot exceed 8 characters"],
        select :false 
    },
    role:{
        type: String,
        default : "user"
    },
    createdAt :{
        type:Date,
        default :Date.now()
    }
})

authSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password,10);
})


authSchema.methods.verifyPassword = async function(enteredPassword){
     return    bcrypt.compare(enteredPassword,this.password)
}

authSchema.methods.getToken = function(){
   return  jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY})
}


const authModel = mongoose.model('User',authSchema);

   
module.exports = authModel;