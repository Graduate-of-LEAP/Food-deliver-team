import { Router } from "express";
import { getMe } from "../controllers";

const getMeRouter = Router();

getMeRouter.get("/me", getMe);

export { getMeRouter };
