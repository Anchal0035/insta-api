"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followStatus = void 0;
const mongoose_1 = require("mongoose");
var followStatus;
(function (followStatus) {
    followStatus["Pending"] = "Pending";
    followStatus["Accepted"] = "Accepted";
    followStatus["Rejected"] = "Rejected";
})(followStatus || (exports.followStatus = followStatus = {}));
const followSchema = new mongoose_1.Schema({
    sender_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    receiver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    status: {
        enum: Object.values(followStatus),
        type: String
    }
}, { timestamps: { createdAt: 'created_at' } });
exports.default = (0, mongoose_1.model)('follow_infos', followSchema);
