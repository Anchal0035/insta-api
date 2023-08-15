"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express = require("express");
const authController_1 = require("../controller/authController");
exports.authRouter = express.Router();
exports.authRouter.post('/signup', authController_1.authController.signup);
exports.authRouter.post('/login', authController_1.authController.login);
