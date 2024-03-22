import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const formDataSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    propertyType: {
      flat: String,
      room: String,
    },
    availability: String,
    dateRange: {
      fromDate: String,
      toDate: String,
    },
    pricing: {
      deposite: Number,
      rent: Number,
    },
    amenities: [String],
    description: String,

    file: [
      {
        type: String,
        // require: true,
      },
    ],

    contactForm: {
      name: String,
      email: String,
      cnic: String,
      phoneNumber: Number,
    },

    accountDetails: [
      {
        accountHolder: String,
        accountNumber: String,
        bank: {
          type: String,
          enum: ["Bank Alhabib", "Easypaisa", "JazzCash", "HBL"],
          required: true,
        },
      },
    ],
    timeSlots: [
      {
        date: Date,
        startTime: String,
        endTime: String,
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const formData = new mongoose.model("formData", formDataSchema, "formData");

export default formData;
