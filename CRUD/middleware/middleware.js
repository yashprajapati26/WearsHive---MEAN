const jwt = require("jsonwebtoken");
const localStorage = require("localStorage")

const config = process.env;

const verifyToken = (req, res, next) => {

                    
    // let token = req.body.token || req.query.token  || req.cookies.token || req.headers['authorization'] || localStorage.getItem('token');

    // we need to check only localstorage
    let token = localStorage.getItem("token")

    console.log("token : ",token)

    if (!token) {
        // return res.redirect("/");
        return res.status(401).json({"msg":"token not found"})
    }
    try {
        const decode = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decode;
    }
    catch (err) {
        return res.status (401).json({"msg":"Invalid Token"})
    }
    return next();
}


module.exports = verifyToken;