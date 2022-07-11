const router = require("express").Router();
const User = require("..models/User");

//register
router.post("/register", (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),

    })
})