import { Router } from "express";
import { createMessageController } from "../controllers/message";

const messageRouter = Router();
messageRouter.post("/", createMessageController);

export { messageRouter };
