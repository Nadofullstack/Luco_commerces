const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // timeout 5s
    });

    console.log("✅ MongoDB connecté");

  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error.message);

   
  }
};

module.exports = connectDB;