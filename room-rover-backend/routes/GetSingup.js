import express from "express";
import User from "../models/User.js"


const GetSignup =  express.Router()

GetSignup.get("/", async (req, res)=>{
  const data = await User.find()
})


export default GetSignup