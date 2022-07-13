const router = require("express").Router();
const {verifyToken, verifyTokenAndAuth} = require("./verifyToken");

router.put("/:id", verifyTokenAndAuth, (req, res) =>{
    
})

module.exports = router