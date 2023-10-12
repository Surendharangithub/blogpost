const Post = require("../models/postModel");
const ErrorHandler =  require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")

// Creating the post 

exports.createPost = catchAsyncError(async (req,res,next)=>{
        
    const {heading,content} = req.body;

    if(!heading ||!content){
        return next(new ErrorHandler("Enter heading and content",400));
    }

    const post = await Post.create({
        heading,
        content,
        user :req.user.id
    })

    res.status(201).json({
        success :true,
        post
    })
} ) 

// getting the single post from the document

exports.getSinglePost = catchAsyncError( async(req,res,next)=>{

    const post = await Post.findById(req.params.id)

    if(!post){
        return next(new ErrorHandler("Post not avaliable",400))
    }

    res.status(200).json({
        success :true,
        post
    })
})

//updating the post 

exports.updatePost = catchAsyncError( async (req,res,next)=>{

    const updatedPost = {
        heading :req.body.heading,
        content :req.body.content
    }

    const post = await Post.findByIdAndUpdate(req.params.id,updatedPost,{
        new: true,
        runValidators :true
    })

    res.status(200).json({
        success:true,
        message : "Updated successfully!",
        post
    })

})

//getting all the documents from the document

exports.getPost = catchAsyncError( async (req,res,next)=>{

    const post = await Post.find({user : req.user.id});

    res.status(200).json({
        success :true,
        count:post.length,
        post
    })
})


//deleting the particular documents from the document

exports.deletePost = catchAsyncError( async (req,res,next)=>{

    const post = await Post.findById(req.params.id);

    post.deleteOne();

    res.status(200).json({
        success :true,
        message: "Deleted successfully"
    })
})