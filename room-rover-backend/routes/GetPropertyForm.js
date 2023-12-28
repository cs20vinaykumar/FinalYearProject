import express from "express";
import formData from "../models/PropertyForm.js";

const GetForm = express.Router();

GetForm.get("/", async (req, res) => {
  try {
    const data = await formData.find(); //.exec()
    res.status(200).json(data);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default GetForm;
