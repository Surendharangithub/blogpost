const express = require("express");
const app =express();
const postRoute = require("./route/post");
const authRoute = require("./route/auth");
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser())

app.use(`/api/v1`,postRoute)
app.use(`/api/v1`,authRoute)


app.use(errorMiddleware)
module.exports = app;