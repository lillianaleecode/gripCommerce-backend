const User = require("../models/User");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const {verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");

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
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User is deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET USER (only admin only)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET EVERY USER (only admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        //bringing the 5 latests users
        //localhost:5000/api/user?new=true
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        //bringing all: localhost:5000/api/user
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER STATS
//users created from last year until now.
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    //mongodb jargon. $gte= greater than equal to
    //had to set timestamp to true (in User.js) to use this aggregate()
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month", //will show only the # of the month.
            total: { $sum: 1 }, //will show to total users registered in that month
          },
        },
      ]);
      res.status(200).json(data);
      console.log(data);
      
    
  });
  
module.exports = router