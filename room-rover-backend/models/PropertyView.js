import mongoose from "mongoose";

const propertyViewSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "formData",
      required: true,
    },
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const PropertyViewModel = mongoose.model("PropertyView", propertyViewSchema);

export default PropertyViewModel;
