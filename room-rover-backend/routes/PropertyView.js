import express from "express";
const propertyViews = express.Router();
import PropertyViewModel from "../models/PropertyView.js";

propertyViews.post("/views/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  const { userId } = req.body;

  try {
    console.log("Property ID:", propertyId);
    console.log("User ID:", userId);

    let propertyView = await PropertyViewModel.findOne({ propertyId });

    if (!propertyView) {
      propertyView = new PropertyViewModel({ propertyId, views: [] });
    }

    if (!propertyView.views.includes(userId)) {
      propertyView.views.push(userId);
    }

    await propertyView.save();

    res.status(200).send({ message: "View added successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

propertyViews.get("/views/:propertyId", async (req, res) => {
  const { propertyId } = req.params;

  try {
    const propertyView = await PropertyViewModel.findOne({ propertyId });

    if (!propertyView) {
      return res.status(404).send({ message: "Property not found" });
    }

    const totalViews = propertyView.views.length;

    res.status(200).send({ totalViews });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

export default propertyViews;
