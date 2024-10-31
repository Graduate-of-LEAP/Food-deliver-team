"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const reviewRouter = (0, express_1.Router)();
exports.reviewRouter = reviewRouter;
reviewRouter.post("/", controllers_1.createReviewController).get("/", controllers_1.getReviewController);
