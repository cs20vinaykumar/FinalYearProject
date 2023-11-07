import express from "express" 
import cors from "cors"
import mongoose, { model } from "mongoose"

const app = express()
const port = 4000
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



const connectToMongoDB = async () => {
    
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/room-rover")
  
      console.log("Connected to MongoDB Successfully");
    } catch (error) {
      console.error("Connection error:", error.message);
    }
  };
  
  connectToMongoDB();










const userSchema = new mongoose.Schema({
    name: String,
    lname: String,
    email: String,
    number: Number,
    password: String
})


const User = new mongoose.model("user" , userSchema)










//Routes


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ message: "Please fill in both email and password fields" });
    }

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error(err);
        res.send({ message: "Internal Server Error" });
    }
});




app.post("/Signup", async (req, res) => {
    const { name, lname, email, number, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const newUser = new User({
                name,
                lname,
                email,
                number,
                password
            });

            await newUser.save();
            res.send({ message: "Successfully Registered" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});




app.listen( port,() =>{
    console.log(`Example app listening on port http://localhost:${port}`)
})


  
