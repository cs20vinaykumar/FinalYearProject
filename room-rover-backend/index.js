import express, { Router } from "express";
import cors from "cors";
import connectToMongoDB from "./Database-connection/db.js";
import router from "./routes/login.js";
import routers from "./routes/signup.js";
import otpVerify from "./routes/sendEmail.js";
import verifycode from "./routes/verifycode.js";
import resetPassword from "./routes/resetPassword.js";
import EmailVerify from "./routes/EmailVerify.js";
import uploadForm from "./routes/PropertyForm.js";
import GetForm from "./routes/GetPropertyForm.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

connectToMongoDB();

//Routes

// Login APi
app.use("/login", router);

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


// Property Form Api
app.use("/PropertyForm", uploadForm);
// 
app.use("/GetPropertyForm", GetForm)



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
