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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.router = express_1.default.Router();
exports.router.post("/create", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const todo = yield prisma.todo.create({
            data: {
                title,
                description,
                userId,
            }
        });
        res.status(201).json({ message: "Todo created succesfully", todo });
    }
    catch (err) {
        res.status(401).json({ error: "error occured" });
    }
}));
exports.router.get("/get", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todos = yield prisma.todo.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                userId: true,
                user: true,
            }
        });
        res.status(200).json({ message: "fetched the todos sucessfully", todos });
    }
    catch (err) {
        res.status(401).json({ error: "error occured" });
    }
}));
exports.router.put("/update/:id", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const id = Number(req.params.id);
        console.log(id);
        const todo = yield prisma.todo.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
                description,
            }
        });
        res.status(200).json({ message: "todo updated successfully", todo });
    }
    catch (err) {
        res.status(401).json({ error: "error occured" });
    }
}));
exports.router.delete("/delete/:id", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const todo = yield prisma.todo.delete({
            where: {
                id: Number(id),
                userId,
            }
        });
        res.status(200).json({ message: "todo deleted successfully", todo });
    }
    catch (err) {
        res.status(401).json({ error: "error occured" });
    }
}));
