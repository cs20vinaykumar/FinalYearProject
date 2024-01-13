import express from "express";
import jwt from "jsonwebtoken"




const profileRouter = express.Router();

import dotenv from "dotenv";
dotenv.config();


profileRouter.post("/", verifyToken, (req, res)=>{
jwt.verify(req.token, process.env.JWT_SECRET , (err, authData)=>{
    if(err){
        res.send({result: "Inavlid token"})
    } else{
        res.json({
            message: "Profile accessed",
            authData
        })
    }
})
})


function verifyToken(req, res, next){
  const tokenHeader = req.headers['authorization'];

  if(typeof tokenHeader !==  "undefined"){
    const bearer = tokenHeader.split(" ", )
    const token = bearer[1]
    req.token = token
    next()

  }
  else{
    res.send({
      result: "Token is not valid"
    })
    
  }
}

export default profileRouter