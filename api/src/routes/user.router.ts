import { Router } from "express";
import { createUserController, getUsersController } from "../controllers";

const userRouter = Router();
userRouter.post("/", createUserController).get("/", getUsersController);
export { userRouter };
