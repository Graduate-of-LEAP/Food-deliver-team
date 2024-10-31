"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const getMeRouter = (0, express_1.Router)();
exports.getMeRouter = getMeRouter;
getMeRouter.get("/me", controllers_1.getMe);
