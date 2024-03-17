import express, { response } from "express";
import User from "../../models/User.js";

const searchUser = express.Router();

searchUser.get("/:search", async (req, res) => {
  try {
    const keyword = req.params.search;
    const result = await User.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    });
    const filteredResults = result.filter(user => user._id.toString() !== req.user.id);
    res.send(filteredResults);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

export default searchUser;
