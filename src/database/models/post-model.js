"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const users_model_1 = __importDefault(require("./users-model"));
const mediaSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    }
});
const postSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: users_model_1.default,
        required: true
    },
    media: [mediaSchema],
    caption: {
        type: String
    },
    likes_count: {
        type: Number,
        default: 0
    },
    comment_count: {
        type: Number,
        default: 0
    }
}, { timestamps: { createdAt: 'created_at' } });
exports.default = (0, mongoose_1.model)('posts', postSchema);
