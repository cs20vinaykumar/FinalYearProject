import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'formData', required: true }, // Reference to the formData schema
    status: { type: String, enum: ["waiting", "accepted", "rejected"], default: "waiting" },
    bookingDate: { type: Date, default: Date.now },
    image: { type: String } // Field to store the path or URL of the image
});

const Booking = mongoose.model("Booking", bookingSchema,"Booking");

export default Booking;