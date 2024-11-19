"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Token not provided" });
            return; // Ensure the function does not proceed further
        }
        const decodedToken = (0, jsonwebtoken_1.verify)(token, "dddfdfdfdfd");
        const userId = decodedToken.id;
        if (req.body.id && req.body.id !== userId) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        req.userId = userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Authentication error occurred" });
    }
});
exports.default = authMiddleware;
