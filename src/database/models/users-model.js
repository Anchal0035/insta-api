"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        default: 'I am new user'
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    post: {
        type: Number,
        default: 0
    }
});
exports.default = (0, mongoose_1.model)('users', userSchema); //ask
