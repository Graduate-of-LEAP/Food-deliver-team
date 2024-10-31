"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const message_1 = require("../controllers/message");
const messageRouter = (0, express_1.Router)();
exports.messageRouter = messageRouter;
messageRouter.post("/", message_1.createMessageController);
