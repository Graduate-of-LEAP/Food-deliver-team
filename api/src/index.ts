import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
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
import { upload } from "./controllers/config/multer";
import { createCloudinaryController } from "./controllers";

connectToDataBase();
const app = express();
app.use(cors());
app.use(express.json());
//
app.get("/", (_req, res) => {
  res.json([{ name: "Saraa" }]);
});
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/savedFood", savedFoodRouter);
app.use("/order", orderRouter);
app.use("/sags", sagsRouter);
app.use("/review", reviewRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/upload", upload.single("image"), createCloudinaryController); //upload.single("image"), ene bol middleware function

app.listen(3001, () => {
  console.log("Server running http://localhost:3001");
});
