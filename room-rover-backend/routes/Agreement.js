import express from "express";
import AgreementForm from "../models/Agreement.js";
import multer from "multer";

const Agreement = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

Agreement.post("/", upload.single("image"), async (req, res) => {
  try {
    const { bulletPoints, ownerName, ownerLName } = req.body;
    const image = req.file.path;
  
    const agreement = new AgreementForm({
      bulletPoints,
      image,
      ownerName,
      ownerLName,
      postedBy: req.user,
    });
    console.log(agreement);
    await agreement.save();
    res.status(201).json({ message: "Agreement created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default Agreement;
