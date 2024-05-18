import express from "express";
import cities from "../models/City.js";

const cityRouter = express.Router();

cityRouter.post("/", async (req, res) => {
  const { name, latitude, longitude } = req.body;

  try {
    const city = new cities({ name, latitude, longitude });
    const savedCity = await city.save();
    res.status(201).json(savedCity);
  } catch (error) {
    console.log("Internal Server Error", error)
  }
});

export default cityRouter
