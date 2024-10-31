"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    if (req.path.startsWith("/user") ||
        req.path.startsWith("/food") ||
        req.path.startsWith("/category") ||
        req.path.startsWith("/order") ||
        req.path.startsWith("/upload") ||
        req.path.startsWith("/sags") ||
        req.path.startsWith("/message")) {
        return next(); // Skip authentication for these routes
    } //user path deer token shalgahgvi
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ error: "Unauthorized" });
    }
};
exports.default = authMiddleware;
