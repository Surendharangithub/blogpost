const app = require("./app");
const mongooseConnect = require("./config/database")
const dotenv = require("dotenv")
const path = require("path");

dotenv.config({path:path.join(__dirname,"./config/config.env")})

mongooseConnect();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running to the port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})