import express from "express";
import cors from "cors";
import { connectToDataBase } from "./database";
import {
  categoryRouter,
  foodRouter,
  orderRouter,
  reviewRouter,
  sagsRouter,
  savedFoodRouter,
  userRouter,
} from "./routes";

connectToDataBase();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
  res.json("Hello world");
});
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/savedFood", savedFoodRouter);
app.use("/order", orderRouter);
app.use("/sags", sagsRouter);
app.use("/review", reviewRouter);
app.listen(3001, () => {
  console.log("Server running http://localhost:3001");
});
