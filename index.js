const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

dotenv.config()

//replaced the password to "ORACLE" and the name of the database ("cake_shop"). ROOT USER PWD IS "ORACLE" created from the DB access section.
//created a secret key "MONGO_URL" in .env to protect strangers to access my mongoDB. 
mongoose
.connect(process.env.MONGO_URL)
.then( ()=> console.log("DB Connection Succesful:)"))
.catch((err) => {
    console.error(err);
});

app.use(express.json())//to allow to use json in postman
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () =>{
    console.log("backend server is running :)");
});