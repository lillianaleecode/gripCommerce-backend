const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("token invalid.");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("not authenticated.")
    }
};

//check if user is an admin or not
const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin ) {
            next()
        } else {
            res.status(403).json("user is not admin. method not allowed")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth};