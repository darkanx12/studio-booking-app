const router = require("express").Router();
const Booking = require("../models/Booking");

router.post("/create", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Saved" });
});

router.get("/all", async (req, res) => {
  const data = await Booking.find().sort({ createdAt: -1 });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
