const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const predictRoute = require("./routes/Predict");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/placements");

app.use("/api/predict", predictRoute);

app.listen(3000, () => {
    console.log("Node server running on port 3000");
});
