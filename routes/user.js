const router = require("express").Router();

router.get("/usertest", (req, res) => {
    res.send("user test is sucessful!")
});

router.post("/userposttest", (req, res) => {
    const username = req.body.username;
    console.log(username); //test it with postman sin there is no interface yet
    res.send("your username is:" + username); //will appear in post man results
})
module.exports = router