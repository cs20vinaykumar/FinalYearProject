import express from "express";
import formData from "../models/PropertyForm.js";

const DeleteForm = express.Router();

DeleteForm.delete("/product/:id", async (req, res) => {
  try {
    const result = await formData.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default DeleteForm;
