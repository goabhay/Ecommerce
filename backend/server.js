import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; // Import morgan for logging
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use(morgan());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// routes

app.use("/user", authRouter);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

try {
  const connection = await mongoose.connect(process.env.DB_URL);
  console.log("DB connected successfully");
} catch (err) {
  console.log("DB Error: ", err);
}

// Handle server error
server.on("error", (err) => {
  console.error("Server error:", err);
});
