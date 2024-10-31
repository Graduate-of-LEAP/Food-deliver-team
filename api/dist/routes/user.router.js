"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter
    .post("/", user_1.createUserController)
    .get("/", user_1.getUsersController)
    .post("/register", user_1.registerController)
    .post("/login", user_1.login)
    .put("/", user_1.editUserController);
