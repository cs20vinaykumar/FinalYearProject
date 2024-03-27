import express from "express";
import AgreementForm from "../models/Agreement.js"

const GetAgreementData = express.Router();

GetAgreementData.get("/", async (req, res) => {
  try {
    const data = await AgreementForm.find()
    .populate("postedBy", "_id ownerName ownerLName ")
    res.status(200).json(data);
    console.log(data)
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




export default GetAgreementData;
