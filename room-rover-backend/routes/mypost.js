import express from "express";
import formData from "../models/PropertyForm.js";

const myPost = express.Router();

myPost.get("/", async (req, res) => {
  try {
    let posts = await formData
      .find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .sort("-createdAt");
    res.json({ myPost: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



myPost.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; 
    let posts = await formData
      .find({ postedBy: userId })
      .sort("-createdAt");
    res.json({ myPost: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default myPost;
