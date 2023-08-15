import express = require("express");
import {followController} from "../controller/followController";
import auth from "../middleware/auth-middleware";

export const followRouter=express.Router();

followRouter.post("/follow", auth, followController.follow);
followRouter.post("/unfollow", auth, followController.follow);
followRouter.post("/following_list", auth, followController.follow);
followRouter.post("/follower_list", auth, followController.follow);
