import express, { Router } from "express";
import cors from "cors";
import connectToMongoDB from "./Database-connection/db.js";
import User from "./models/User.js";
import router from "./routes/login.js";
import routers from "./routes/signup.js";
import otpVerify from "./routes/sendEmail.js"


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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
