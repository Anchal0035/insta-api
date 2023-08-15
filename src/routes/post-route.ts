import express from "express";
import { postController } from "../controller/postController";
import auth from "../middleware/auth-middleware";

export const postRouter = express.Router();

postRouter.post('/post',auth, postController.post);