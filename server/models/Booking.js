const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  date: String,
  message: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
