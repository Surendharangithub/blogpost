const express = require("express");
const router = express.Router();
const {register, loginUser, logoutUser, getAllUsers, getUser} = require("../controllers/authController");
const {isAuthenticate} = require("../middleware/authenticate")

router.route("/register").post(register);
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/users").get(isAuthenticate,getAllUsers)
router.route("/user").get(isAuthenticate,getUser)

module.exports =router;