import express, { Router } from "express";
import cors from "cors";
import connectToMongoDB from "./Database-connection/db.js"
import router from "./routes/login.js";
import routers from "./routes/signup.js";
import otpVerify from "./routes/sendEmail.js";
import verifycode from "./routes/verifycode.js";
import resetPassword from "./routes/resetPassword.js";
import EmailVerify from "./routes/EmailVerify.js";
import uploadForm from "./routes/PropertyForm.js";
import GetForm from "./routes/GetPropertyForm.js";
import DeleteForm from "./routes/DeletePropertyForm.js";
import UpdateForm from "./routes/UpdatePropertyForm.js";
import authMiddleware from "../room-rover-backend/middleWare/requiredLogin.js"
import myPost from "./routes/mypost.js";
import updateProfile from "./routes/UpdateProfile.js";
import searchFilter from "./routes/SearchFilter.js";
import Agreement from "../room-rover-backend/routes/Agreement.js"
import GetAgreementData from "./routes/GetAgreementData.js";
import booking from "./routes/Booking.js";
import timeSlots from "./routes/GetTimeSlot.js";
import RequestVisit from "../room-rover-backend/routes/RequestVisit.js"
// import searchUser from "./routes/SearchUser.js";


const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static("public"));
connectToMongoDB();

//Routes

// Login APi
app.use("/login", router);


// app.use("/profile", profile)

// Signup Api

app.use("/Signup", routers);

// SendEmail Api
app.use("/sendEmail", otpVerify);

// verifycode Api
app.use("/verifycode", verifycode);

// verifycode Api
app.use("/resetpassword", resetPassword);

// verifycode Api
app.use("/EmailVerify", EmailVerify);

// Property Form Api   CRUD Operations
app.use("/PropertyForm",authMiddleware,  uploadForm); 
//
app.use("/GetPropertyForm", authMiddleware, GetForm);
app.use("/GetTimeSlot", authMiddleware, timeSlots);




//
app.use("/DeletePropertyForm", DeleteForm);
//
app.use("/UpdatePropertyForm", UpdateForm)


// onlyLoginUserPosts
app.use("/mypost",authMiddleware, myPost)

// Api for Profile
app.use("/updateProfile", authMiddleware, updateProfile)


//Api for search filter 
app.use("/Search", authMiddleware, searchFilter)

//Api for search filter 
// app.use("/UserSearch", authMiddleware,  searchUser)


//Api for Agreement Form
app.use("/Agreement", authMiddleware, Agreement)


//Api for Get Agreement Form
app.use("/GetAgreementData", authMiddleware, GetAgreementData)


app.use("/booking", authMiddleware, booking)


app.use("/PostRquest", authMiddleware, RequestVisit)






app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
