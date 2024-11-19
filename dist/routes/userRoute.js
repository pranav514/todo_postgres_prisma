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
const bcrypt_1 = require("bcrypt");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.router.post("/user/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstname, lastname } = req.body;
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = (0, bcrypt_1.hashSync)(password, 10);
        const val = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstname,
                lastname,
            },
        });
        res.status(200).json({ message: "User registered sucessfully", val });
    }
    catch (err) {
        res.status(400).json({ error: "user could not register" });
    }
}));
exports.router.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const findUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    });
    if (!findUser) {
        res.status(400).json({ error: "user not found" });
    }
    const hashedPassword = findUser.password;
    if (!(0, bcrypt_1.compareSync)(password, hashedPassword)) {
        res.status(400).json({ error: "wrong password entered" });
    }
    const token = (0, jsonwebtoken_1.sign)({ id: findUser.id }, "dddfdfdfdfd");
    res.status(200).json({ message: "user logged in sucessfully", findUser, token });
}));
exports.router.put("/user/update", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname } = req.body;
        const id = req.userId;
        const remove = yield prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstname: firstname,
                lastname: lastname,
            }
        });
        res.status(200).json({ message: "user updated sucessfully", remove });
    }
    catch (err) {
        res.status(400).json({ error: "user could not update" });
    }
}));
exports.router.delete("/user/delete", authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const remove = yield prisma.user.delete({
            where: {
                id: id,
            }
        });
        res.status(200).json({ message: "user deleted sucessfully", remove });
    }
    catch (err) {
        res.status(400).json({ error: "user could not delete" });
    }
}));
