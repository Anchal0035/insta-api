"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_connect_1 = __importDefault(require("./src/database/db-connect"));
const auth_route_1 = require("./src/routes/auth-route");
const post_route_1 = require("./src/routes/post-route");
const follow_route_1 = require("./src/routes/follow-route");
const app = express();
app.use(express.json());
db_connect_1.default;
app.use("/auth", auth_route_1.authRouter);
app.use("/upload", post_route_1.postRouter);
app.use("/data", follow_route_1.followRouter);
let a = "hello gcvhgvjhvjh";
console.log(a);
app.listen(4000, () => {
    console.log(`server started at port ${4000}`);
});
