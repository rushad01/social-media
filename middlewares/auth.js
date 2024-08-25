const jwt = require("jsonwebtoken");
//Use .env for production
const dotenv = require("dotenv").config(({path:"env.example"}));

function authenticationToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) return res.status(401);

    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        // console.log(error);
        // console.log(user);

        if(error) return res.sendStatus(403);
        
        /**
         * Token = "user":{
         * "user":{
         * "email",
         * "id"
         * }}
         */
        req.user = user;
        next();
    });

}

module.exports = authenticationToken;