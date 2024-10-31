"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedFoodRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const savedFoodRouter = (0, express_1.Router)();
exports.savedFoodRouter = savedFoodRouter;
savedFoodRouter
    .post("/", controllers_1.CreateSavedFoodController)
    .get("/", controllers_1.getSavedFoodsController)
    .get("/:id", controllers_1.getOneSavedFoodController)
    .put("/", controllers_1.editFoodController)
    .delete("/", controllers_1.deleteSavedFoodController);
