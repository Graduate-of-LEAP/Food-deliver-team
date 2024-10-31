"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sagsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const sagsRouter = (0, express_1.Router)();
exports.sagsRouter = sagsRouter;
sagsRouter
    .post("/", controllers_1.createSagsController)
    .get("/", controllers_1.getSagsController)
    .get("/:id", controllers_1.getOneSagsController)
    .put("/", controllers_1.editSagsController)
    .delete("/", controllers_1.deletSagsController);
