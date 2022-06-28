const express = require("express");
const app = express();
const mongoose = require("mongoose");

//replaced the password to "ORACLE" and the name of the database ("cake_shop"). ROOT USER PWD IS "ORACLE" created from the DB access section.
mongoose
.connect("mongodb+srv://root:ORACLE@node.zn6hp.mongodb.net/cake_shop?retryWrites=true&w=majority")
.then( ()=> console.log("DB Connection Succesful:)"))
.catch((err) => {
    console.error(err);
});



app.listen(5000, () =>{
    console.log("backend server is running :)");
});