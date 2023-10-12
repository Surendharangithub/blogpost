const express  = require("express");
const router = express.Router();
const {createPost, getPost, getSinglePost, deletePost, updatePost} = require("../controllers/postController")
const {isAuthenticate}  = require("../middleware/authenticate")

router.route("/create").post(isAuthenticate,createPost);
router.route("/post/:id").get(getSinglePost)
                         .put(updatePost)
                         .delete(deletePost)

                         
router.route("/posts").get(isAuthenticate,getPost)
module.exports = router