"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter
    .post("/", controllers_1.createCategoryController)
    .get("/", controllers_1.getCategoriesController)
    .delete("/", controllers_1.deletCategoryController)
    .put("/", controllers_1.editCategoryController);
