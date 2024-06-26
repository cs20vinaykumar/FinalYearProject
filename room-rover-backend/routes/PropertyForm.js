import express from "express";
import formData from "../models/PropertyForm.js";
import multer from "multer";
import path from "path";

const uploadForm = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

uploadForm.post("/", upload.array("file", 10), async (req, res) => {
  try {
    const { files } = req;
    const timeSlots = JSON.parse(req.body.timeSlots);
    const fileNames = files.map((file) => file.filename);
    const accountDetails = JSON.parse(req.body.accountDetails);
    const formDataEntry = new formData({
      ...req.body,
      file: fileNames,
      timeSlots: timeSlots,
      accountDetails: accountDetails,
      postedBy: req.user,
    });

    await formDataEntry.save();
    res
      .status(200)
      .send({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

uploadForm.put("/:productId/booking", async (req, res) => {
  const { productId } = req.params;
  const { status } = req.body;

  try {
    const updatedFormData = await formData.findByIdAndUpdate(
      productId,
      { "booking.status": status },
      { new: true }
    );

    res.json(updatedFormData);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

export default uploadForm;
