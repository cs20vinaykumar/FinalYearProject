import express from "express";
import cors from "cors";
import connectToMongoDB from "../room-rover-backend/Databse-connection/db.js";
import routers from "../room-rover-backend/routes/Singup.js";
import router from "../room-rover-backend/routes/Login.js";
import updateProfile from "../room-rover-backend/routes/UpdateProfile.js"
import authMiddleware from "./middleWare/requiredLogin.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static("public"));
connectToMongoDB();

// Signup Api
app.use("/Signup", routers);

// Login Api
app.use("/login", router);

app.use("/ProfileUpdate", authMiddleware, updateProfile )

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
