const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS fix for production (Vercel + local)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://studio-booking-app-murex.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ✅ IMPORTANT for Render (dynamic port)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
