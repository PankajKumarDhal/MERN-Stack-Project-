import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
//  configrution
dotenv.config("./.env");

// database
connectDB();
//rest object
const app = express();

// middle
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<hi>welcome to e-commerce app</hi>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
