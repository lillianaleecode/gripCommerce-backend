const User = require("../models/User");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const {verifyTokenAndAuth} = require("./verifyToken");

//to update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {

    //before updating, encript the password
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    //update:
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, { $set: req.body }, {new: true }
            );
        
        res.status(200).json(updateUser);

    } catch(err){
        res.status(500).json(err);
    }
})

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User is deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router