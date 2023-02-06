const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

const studentRoutes = require("./routes/courses");
const courseRoutes = require("./routes/course");

app.get("/api/klarr/", (req, res) => {
  res.send("Hello from KLARR :)");
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running`));
