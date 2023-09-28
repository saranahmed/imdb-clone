require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const movieRoutes = require("./routes/movies");
const app = express();

dbConnect();
app.use(express.json());
app.use(cors());

app.use("/", movieRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}...`));
