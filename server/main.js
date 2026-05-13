const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
