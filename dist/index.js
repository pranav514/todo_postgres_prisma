"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const todoRoutes_1 = require("./routes/todoRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", userRoute_1.router);
app.use("/api/v1", todoRoutes_1.router);
app.listen(8080, () => {
    console.log("connect to localhost : 8080");
});
