import { Router } from "express";
import { createUserController, getUsersController, registerController } from "../controllers/user";

const userRouter = Router();
userRouter.post("/", createUserController).get("/", getUsersController).post("/register",registerController);
export { userRouter };
