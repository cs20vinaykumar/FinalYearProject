import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { userID } = payload;

    const userdata = await User.findById(userID).then((userdata) => {
      req.user = userdata;
      next();
    });

    // if (!userdata) {
    //   return res.status(401).json({ error: "" });
    // }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "User not found" });
  }
};

export default authMiddleware;
