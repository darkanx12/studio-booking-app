require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URL);

(async () => {
  const hash = await bcrypt.hash("AbHi@1234", 10);

  await Admin.create({
    email: "darkanx537@gmail.com",
    password: hash
  });

  console.log("Admin Created");
  process.exit();
})();
