import express = require("express");
import { authController } from "../controller/authController";
export const authRouter = express.Router();


authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);