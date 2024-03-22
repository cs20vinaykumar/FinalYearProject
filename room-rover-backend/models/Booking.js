import mongoose, { model } from "mongoose"

    const bookingSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        status: { type: String, enum: ["waiting", "accepted", "rejected"], default: "waiting" },
        bookingDate: { type: Date, default: Date.now },
      });


   const Booking = new mongoose.model("Booking", bookingSchema, "Booking" )

export default Booking