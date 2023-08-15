"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.followController = void 0;
const mongoose_1 = require("mongoose");
const follow_model_1 = __importStar(require("../database/models/follow-model"));
const users_model_1 = __importDefault(require("../database/models/users-model"));
class FollowController {
    follow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender_id = req.body.id;
                const { receiver_id, status } = req.body;
                const checkReceiver = yield users_model_1.default.findOne({ _id: receiver_id });
                console.log('checkReceiver ', checkReceiver);
                if (checkReceiver) {
                    const checkFollowInfo = yield follow_model_1.default.findOne({ sender_id: sender_id, receiver_id: receiver_id });
                    console.log('checkFollowInfo ', checkFollowInfo);
                    const checkStatus = status === follow_model_1.followStatus.Rejected;
                    console.log('checkStatus ', checkStatus);
                    const filter1 = { _id: sender_id };
                    const update1 = { $inc: { following: 1 } };
                    const filter2 = { _id: receiver_id };
                    const update2 = { $inc: { followers: 1 } };
                    console.log("filter1=", filter1);
                    console.log("update1=", update1);
                    const q3 = yield users_model_1.default.findOne({ _id: sender_id });
                    console.log('user ', q3);
                    if (sender_id === receiver_id) {
                        return res.status(400).send("You don't send request to your self");
                    }
                    else if (!checkFollowInfo) {
                        const follow = yield follow_model_1.default.create({ sender_id, receiver_id, status });
                        console.log('Request send', follow);
                        yield users_model_1.default.updateOne(filter1, update1);
                        yield users_model_1.default.updateOne(filter2, update2);
                        const q2 = yield users_model_1.default.findOne({ _id: sender_id });
                        console.log('user1 ', q2);
                        return res.status(200).json({ message: "Request send" });
                    }
                    else if (checkFollowInfo && checkStatus) {
                        const follow = yield follow_model_1.default.create({ sender_id, receiver_id, status });
                        console.log('Request resend', follow);
                        yield users_model_1.default.updateOne(filter1, update1);
                        yield users_model_1.default.updateOne(filter2, update2);
                        const q1 = yield users_model_1.default.findOne({ _id: sender_id });
                        console.log('user2 ', q1);
                        return res.status(200).json({ message: "Request resend" });
                    }
                    return res.status(400).json({ message: "Your request is pending or Accepted" });
                }
                return res.status(400).json({ message: "User not exit" });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
    unfollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender_id = req.body.id;
                console.log(sender_id);
                const { receiver_id } = req.body;
                const check1 = yield users_model_1.default.findOne({ _id: receiver_id });
                console.log('check 1 ', check1);
                if (check1) {
                    const check2 = yield follow_model_1.default.findOne({ sender_id: sender_id, receiver_id: receiver_id });
                    console.log('check 2 ', check2);
                    const check3 = (check2 === null) || (check2.status === follow_model_1.followStatus.Accepted);
                    console.log('check 3 ', check3);
                    const filter1 = { _id: sender_id };
                    const update1 = { $inc: { following: -1 } };
                    const filter2 = { _id: receiver_id };
                    const update2 = { $inc: { followers: -1 } };
                    if (sender_id === receiver_id) {
                        return res.status(400).send("This is your id and you don't unfollow yourself");
                    }
                    else if (check2 && check3) {
                        const filter = { _id: check2._id };
                        const unfollow = yield follow_model_1.default.deleteOne(filter);
                        console.log('Unfollowed', unfollow);
                        const check3 = yield follow_model_1.default.findOne({ sender_id: sender_id, receiver_id: receiver_id });
                        console.log('check 3 ', check3);
                        yield users_model_1.default.updateOne(filter1, update1);
                        yield users_model_1.default.updateOne(filter2, update2);
                        return res.status(200).json({ message: "Unfollowed" });
                    }
                    return res.status(400).json({ message: "You don't follow him" });
                }
                return res.status(400).json({ message: "User not exit" });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
    following_list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender_id = req.body.id;
                console.log(sender_id);
                let pipeline = [];
                pipeline.push({ $match: { status: follow_model_1.followStatus.Accepted } });
                pipeline.push({ $match: { sender_id: new mongoose_1.Types.ObjectId(sender_id) } });
                pipeline.push({
                    $lookup: {
                        from: 'users',
                        localField: "receiver_id",
                        foreignField: "_id",
                        as: "user"
                    }
                });
                pipeline.push({
                    $project: {
                        'user.username': 1,
                    },
                });
                let c = yield follow_model_1.default.aggregate(pipeline);
                console.log(c);
                res.status(200).send(c);
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
    follower_list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender_id = req.body.id;
                console.log(sender_id);
                let pipeline = [];
                pipeline.push({ $match: { status: follow_model_1.followStatus.Accepted } });
                pipeline.push({ $match: { receiver_id: new mongoose_1.Types.ObjectId(sender_id) } });
                pipeline.push({
                    $lookup: {
                        from: 'users',
                        localField: "sender_id",
                        foreignField: "_id",
                        as: "user"
                    }
                });
                pipeline.push({
                    $project: {
                        sender_id: 1,
                        'user.username': 1,
                    },
                });
                let c = yield follow_model_1.default.aggregate(pipeline);
                res.status(200).send(c);
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
        });
    }
}
exports.followController = new FollowController();
