const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRoutes = require("./routes/auth");
const authMiddleware= require("./middleware/authMiddleware.js")
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));



app.use("/auth", authRoutes);

app.get("/home", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `Welcome, ${user.name}` });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
