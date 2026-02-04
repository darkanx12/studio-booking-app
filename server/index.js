const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
