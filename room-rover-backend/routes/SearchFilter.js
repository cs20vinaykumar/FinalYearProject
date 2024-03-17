import express from "express";
import propertyForm from "../models/PropertyForm.js";

const searchFilter = express.Router();

searchFilter.get("/:key", async (req, res) => {
  try {
    const result = await propertyForm.find({
      $or: [
        // { location: { $regex: req.params.key, $options: "i" } },
        { "propertyType.room": { $regex: req.params.key, $options: "i" } },
        { "propertyType.flat": { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

export default searchFilter;
