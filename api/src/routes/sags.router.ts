import { Router } from "express";
import { createSagsController, getOneSagsController, getSagsController, editSagsController, deletSagsController } from "../controllers";

const sagsRouter = Router();
sagsRouter
.post("/", createSagsController)
.get("/", getSagsController)
.get("/:id", getOneSagsController)
.put("/",  editSagsController)
.delete("/", deletSagsController)
export { sagsRouter };
