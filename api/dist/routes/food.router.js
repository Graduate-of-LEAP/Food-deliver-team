"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const foodRouter = (0, express_1.Router)();
exports.foodRouter = foodRouter;
foodRouter
    .post("/", controllers_1.createFoodController)
    .get("/", controllers_1.getFoodsController)
    .get("/:id", controllers_1.getOneFoodController)
    .put("/", controllers_1.editFoodController)
    .delete("/", controllers_1.deletFoodController);
