import { Router } from "express";
import { createSagsController, getSagsController } from "../controllers";

const sagsRouter = Router();
sagsRouter.post("/", createSagsController).get("/", getSagsController);
export { sagsRouter };
