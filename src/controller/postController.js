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
exports.postController = void 0;
const post_model_1 = __importDefault(require("../database/models/post-model"));
const users_model_1 = __importDefault(require("../database/models/users-model"));
class PostController {
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { media, caption } = req.body;
                const post = yield post_model_1.default.create({ user_id, media, caption });
                const filter1 = { _id: user_id };
                const update1 = { $inc: { post: 1 } };
                yield users_model_1.default.updateOne(filter1, update1);
                console.log('post uploaded', post);
                return res.status(200).json({ message: "post uploaded" });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
}
exports.postController = new PostController();
