import express from "express";
import formData from "../models/PropertyForm.js";

const UpdateForm = express.Router();

UpdateForm.get("/product/:id", async (req, res) => {
  try {
    const result = await formData.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Record Not founnd" });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

UpdateForm.put("/product/:id", async (req, res) => {
  try {
    const result = await formData.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (result.nModified <= 0) {
      res.json({ message: "Product Not Found" });
    } else {
      res.status(200).json({ message: "Update successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default UpdateForm;
