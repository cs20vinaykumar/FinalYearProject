import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  title: String,
  location: String,
  propertyType: {
    flat: String,
    room: String,
  },
  availability: String,
  dateRange: {
    start: { type: Date },
    end: { type: Date },
  },
  pricing: {
    deposite: Number,
    rent: Number,
  },
  amenities: [String],
  description: String,
  file: {
    type: String,
    require: true,
  },

  contactForm: {
    name: String,
    email: String,
    cnic: String,
    phoneNumber: String,
  },
});

const formData = new mongoose.model("formData", formDataSchema, "formData");

export default formData;
