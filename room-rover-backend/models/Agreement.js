import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const agreementSchema = new mongoose.Schema({
  bulletPoints: [String],
  image: [String],
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

const AgreementForm = new mongoose.model(
  "AgreementData",
  agreementSchema,
  "AgreementData"
);

export default AgreementForm;
