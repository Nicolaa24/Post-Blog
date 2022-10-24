import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "../routes/auth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT ?? 5001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bjwzegf.mongodb.net/Blog?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on ${PORT}...`));
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
