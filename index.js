import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/user.js";
import forumRoute from "./routes/forum.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("CONECTED TO MONGO DB");
  } catch (error) {
    throw error;
  }
};

// middlewares

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/forum", forumRoute);
app.use(errorMiddleware);

app.listen(3000, () => {
  connect();
  console.log("running on 8000");
});
