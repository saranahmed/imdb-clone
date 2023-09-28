const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(process.env.DB, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => console.log("Connected to DB"));
  mongoose.connection.on("error", () =>
    console.log("Error while connecting to DB")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("DB connection disconnected")
  );
};

module.exports = dbConnect;
