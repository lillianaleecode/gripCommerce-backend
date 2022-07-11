const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth");

dotenv.config()

//replaced the password to "ORACLE" and the name of the database ("cake_shop"). ROOT USER PWD IS "ORACLE" created from the DB access section.
//created a secret key "MONGO_URL" in .env to protect strangers to access my mongoDB. 
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then( ()=> console.log("DB Connection Succesful:)"))
.catch((err) => {
    console.error(err);
});

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.listen(PORT , () => console.log(`backend started on ${PORT}` ))