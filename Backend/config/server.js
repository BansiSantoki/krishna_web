require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.listen(5000, () => {
    console.log("Server Started");
});