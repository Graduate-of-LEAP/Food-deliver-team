"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const database_1 = require("./database");
const routes_1 = require("./routes");
const multer_1 = require("./controllers/config/multer");
const controllers_1 = require("./controllers");
const auth_middleware_1 = __importDefault(require("./controllers/middleware/auth.middleware"));
(0, database_1.connectToDataBase)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//
app.get("/", (_req, res) => {
    res.json([{ name: "Saraa" }]);
});
app.use(auth_middleware_1.default);
app.use("/category", routes_1.categoryRouter);
app.use("/food", routes_1.foodRouter);
app.use("/user", routes_1.userRouter);
app.use("/savedFood", routes_1.savedFoodRouter);
app.use("/order", routes_1.orderRouter);
app.use("/sags", routes_1.sagsRouter);
app.use("/review", routes_1.reviewRouter);
app.use("/auth", routes_1.getMeRouter);
app.use("/message", routes_1.messageRouter);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
app.post("/upload", multer_1.upload.single("image"), controllers_1.createCloudinaryController); //upload.single("image"), ene bol middleware function
app.listen(3001, () => {
    console.log("Server running http://localhost:3001");
});
