const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    heading:{
        type:String,
        requried:[true,"Enter heading for your heading"]
    },
    content:{
        type:String,
        requried:[true,"Enter content"]
    },
    user:{
        type :mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel