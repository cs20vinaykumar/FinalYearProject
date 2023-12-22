import express from "express";
import formData from "../models/PropertyForm.js";

const uploadForm = express.Router();

uploadForm.post("/", async (req, res) => {
  try {
    const formDataEntry = new formData(req.body);
    const missingFields = validateRequiredFields(formDataEntry);
    if (missingFields.length > 0) {
      res.status(400).send({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    await formDataEntry.save();
    res
      .status(200)
      .send({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

function validateRequiredFields(formDataEntry) {
  const requiredFields = [
    "title",
    "location",
    "propertyType.flat",
    "propertyType.room",
    "availability",
    "dateRange.start",
    "dateRange.end",
    "pricing.deposite",
    "pricing.rent",
    "amenities",
    "description",
    "contactForm.name",
    "contactForm.email",
    "contactForm.cnic",
    "contactForm.phoneNumber",
  ];

  const missingFields = [];

  requiredFields.forEach((fieldPath) => {
    const value = fieldPath
      .split(".")
      .reduce((obj, key) => obj[key], formDataEntry);

    if (!value) {
      missingFields.push(fieldPath);
    }
  });

  return missingFields;
}
export default uploadForm;
