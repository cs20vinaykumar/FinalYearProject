import express from "express";
import formData from "../models/PropertyForm.js";

const GetForm = express.Router();

GetForm.get("/", async (req, res) => {
  try {
    const data = await formData
      .find()
      .populate("postedBy", "_id name lname email number")
      .sort("-createdAt");
    res.status(200).json(data);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

GetForm.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await formData.findByIdAndDelete(id);
    res.status(200).json({ message: "Property form entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default GetForm;
