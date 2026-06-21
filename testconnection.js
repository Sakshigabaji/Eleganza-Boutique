const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/eleganza";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Connection Failed:");
    console.log(err.message);
    process.exit(1);
  });