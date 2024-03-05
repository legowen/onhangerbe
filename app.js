const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // "req.body" is recognized as an object.

app.use("/api", indexRouter); //Setup Router, /api/user
const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB Connection Fail, err"));

app.listen(process.env.PORT || 5020, () => {
  console.log("server on");
});
