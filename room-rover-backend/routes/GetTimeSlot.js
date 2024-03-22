import express from "express";
import propertyForm from "../models/PropertyForm.js";

const timeSlots = express.Router()

timeSlots.get("/", async (req,res)=>{
    try {
        const timeSlots = await propertyForm.find(timeSlots);
        res.json({ formData: timeSlots });
      } catch (error) {
        console.error("Error fetching time slots:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

export default timeSlots