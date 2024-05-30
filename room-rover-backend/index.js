import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectToMongoDB from "./Database-connection/db.js";
import http from "http";
import { Server } from "socket.io";
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
import authMiddleware from "../room-rover-backend/middleWare/requiredLogin.js";
import myPost from "./routes/mypost.js";
import updateProfile from "./routes/UpdateProfile.js";
import searchFilter from "./routes/SearchFilter.js";
import Agreement from "../room-rover-backend/routes/Agreement.js";
import GetAgreementData from "./routes/GetAgreementData.js";
import booking from "./routes/Booking.js";
import routerChat from "../room-rover-backend/routes/Chat.js";
import RequestVisit from "../room-rover-backend/routes/RequestVisit.js";
import Complaint from "./routes/Complaint.js";
import cityRouter from "./routes/City.js";
import path from "path";
import propertyViews from "./routes/PropertyView.js";
// import searchUser from "./routes/SearchUser.js";

// Create the Express app
const app = express();

// Port
const port = process.env.PORT || 4000;

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/assets", express.static(path.join("./public/Images")));
connectToMongoDB();
app.use(morgan("dev"));

// Create the HTTP server
const server = http.createServer(app);

// Initialize socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Routes
app.use("/login", router);
app.use("/Signup", routers);
app.use("/sendEmail", otpVerify);
app.use("/verifycode", verifycode);
app.use("/resetpassword", resetPassword);
app.use("/EmailVerify", EmailVerify);
app.use("/PropertyForm", authMiddleware, uploadForm);
app.use("/GetPropertyForm", authMiddleware, GetForm);
app.use("/DeletePropertyForm", DeleteForm);
app.use("/UpdatePropertyForm", UpdateForm);
app.use("/mypost", authMiddleware, myPost);
app.use("/updateProfile", authMiddleware, updateProfile);
app.use("/Search", authMiddleware, searchFilter);
app.use("/Agreement", authMiddleware, Agreement);
app.use("/GetAgreementData", authMiddleware, GetAgreementData);
app.use("/booking", authMiddleware, booking);
app.use("/PostRquest", authMiddleware, RequestVisit);
app.use("/complaints", authMiddleware, Complaint);
app.use("/Cities", authMiddleware, cityRouter);
app.use("/chat", authMiddleware, routerChat);
app.use("/property", authMiddleware, propertyViews);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", (message) => {
    io.to(message.roomId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
