import { Router } from "express";
import {
  createUserController,
  editUserController,
  getUsersController,
  login,
  registerController,
} from "../controllers/user";

const userRouter = Router();
userRouter
  .post("/", createUserController)
  .get("/", getUsersController)
  .post("/register", registerController)
  .post("/login", login)
  .put("/", editUserController);
export { userRouter };
