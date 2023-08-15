"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express = require("express");
const followController_1 = require("../controller/followController");
const auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
exports.followRouter = express.Router();
exports.followRouter.post("/follow", auth_middleware_1.default, followController_1.followController.follow);
exports.followRouter.post("/unfollow", auth_middleware_1.default, followController_1.followController.follow);
exports.followRouter.post("/following_list", auth_middleware_1.default, followController_1.followController.follow);
exports.followRouter.post("/follower_list", auth_middleware_1.default, followController_1.followController.follow);
