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
    start: Date, 
    end: Date,   
  },
  pricing: {
    deposite: Number,
    rent: Number,     
  },
   amenities: [String],
  description: String, 
  contactForm: {
    name: String,
    email: String,
    cnic: String, 
    phoneNumber: String,
    userEmail: String
  },
});

const formData = new mongoose.model( "formData", formDataSchema,"formData" );

export default formData;
