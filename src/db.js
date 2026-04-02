const mongoose = require('mongoose');

console.log("ENV CHECK:", process.env.MONGO_URI); // 👈 ADD THIS

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));
