const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to mongodb: ${conn.connection.host}`);
  } catch (error) {
    console.log("mongoError", error.message);
  }
};

module.exports = dbConnection;
