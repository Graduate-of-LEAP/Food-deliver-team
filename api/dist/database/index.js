"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDataBase = void 0;
const mongoose_1 = require("mongoose");
const connectToDataBase = async () => {
    await (0, mongoose_1.connect)("mongodb+srv://tadashia:6xTsXv8V2VB6808i@fooddeliver.jtmgk.mongodb.net/");
    console.log("Connected mongodb database");
};
exports.connectToDataBase = connectToDataBase;
