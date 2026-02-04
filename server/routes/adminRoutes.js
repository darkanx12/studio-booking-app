const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  const isMatch = await bcrypt.compare(req.body.password, admin.password);

  if (!isMatch) return res.status(400).json("Wrong details");

  const token = jwt.sign({ id: admin._id }, "secretkey");
  res.json({ token });
});

module.exports = router;
