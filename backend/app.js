const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const rootRouter = require("./routes/index");

const app = express();

// Read .env
dotenv.config({ path: "./config.env" });

// DB Connection
const DB = process.env.MONGO_COMPASS;
mongoose.connect(DB).then(() => console.log("CONNECTED TO DB SUCCESSFULLY..."));

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());

// Endpoints
app.use("/api/v1", rootRouter);

// Server
const port = 4000 || 8000;
app.listen(port, (req, res) => {
  console.log(`LISTENING ON PORT ${port}`);
});
