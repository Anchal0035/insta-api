"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose  from "mongoose"
// const sessionSchema = new mongoose.Schema({
//     user_id:{type:String},
//     session_id:{type:String},
//     device_type:{type:String},
//     device_id:{type:String}
// })
// export const sessionModel = mongoose.model('Session',sessionSchema)
const mongoose_1 = require("mongoose");
const users_model_1 = __importDefault(require("./users-model"));
const sessionSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: users_model_1.default,
        required: true
    },
    device_type: {
        type: String,
        required: true
    },
    device_id: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' }
});
exports.default = (0, mongoose_1.model)('Session', sessionSchema);
