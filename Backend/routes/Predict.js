const express = require("express");
const axios = require("axios");
const Student = require("../models/Student");

const router = express.Router();

router.post("/", async (req, res) => {
    const userData = req.body;

    const mlServiceUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000/predict";

    const mlResponse = await axios.post(
        mlServiceUrl,
        userData
    );

    const result =
        mlResponse.data.placed === 1
            ? "Likely to be Placed"
            : "Needs Improvement";

    const record = new Student({
        ...userData,
        prediction: result,
        confidence: mlResponse.data.confidence
    });

    await record.save();

    res.json({
        prediction: result,
        confidence: mlResponse.data.confidence
    });
});

module.exports = router;
