import express from "express";
import { actionController } from "../controller/actionController";
import auth from "../middleware/auth-middleware";

export const actionRouter = express.Router();

actionRouter.post('/action', auth, actionController.action);
actionRouter.get('/allComment', auth, actionController.allComment);
actionRouter.get('/allLikes', auth, actionController.allLikes);