"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
exports.postRouter = express_1.default.Router();
exports.postRouter.post('/post', auth_middleware_1.default, postController_1.postController.post);
