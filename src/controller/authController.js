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
exports.authController = void 0;
const users_model_1 = __importDefault(require("../database/models/users-model"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const redis_1 = require("redis");
const session_model_1 = __importDefault(require("../database/models/session-model"));
const client = (0, redis_1.createClient)();
client.on("error", (err) => {
    console.log("Redis Client Error", err);
});
client.connect();
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("signup process");
                const { username, email, password } = req.body;
                const checkName = yield users_model_1.default.findOne({ username: username });
                const checkEmail = yield users_model_1.default.findOne({ email: email });
                if (!checkEmail && !checkName) {
                    const hashPwd = yield bcrypt.hash(password, 4);
                    console.log(hashPwd);
                    const Createuser = yield users_model_1.default.create({ username: username, email: email, password: hashPwd });
                    console.log("SignUp sucessful");
                    return res.status(200).json({ message: "OK" });
                }
                else if (checkEmail || checkName) {
                    return res.status(400).json({ message: "Username or email exist" });
                }
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
            console.log("signup process over");
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("login Process");
                const { username, password } = req.body;
                const result = yield users_model_1.default.findOne({ username: username });
                if (!username) {
                    return res.status(200).json({ message: "wrong username" });
                }
                const pass = yield bcrypt.compare(password, result.password);
                if (pass) {
                    console.log('Login result', result);
                    const token = jwt.sign({ id: result._id }, "secretkey", { expiresIn: '3h' });
                    let session_payload = {
                        user_id: result._id,
                        device_id: "1234",
                        device_type: "google chrome",
                        isSessionActive: true
                    };
                    yield session_model_1.default.insertMany([
                        session_payload
                    ]);
                    yield client.set(`${result._id}_session`, JSON.stringify(session_payload));
                    return res.send({ message: "User Login Succesfully", token: token });
                }
                return res.status(400).json({ message: "Incorrect Password" });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json({ message: "server problem" });
            }
            console.log("login Process over");
        });
    }
}
exports.authController = new AuthController();
// import User from "../database/models/users-model";
// import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
// import * as Redis from 'ioredis';
// import { createClient } from "redis";
// import sessionModel from "../database/models/session-model";
// const client = createClient();
// client.on("error", (err:Error) => console.log("Redis Client Error", err));
// client.connect();
// class AuthController {
//     async signup(req:any, res:any) {
//         try {
//             console.log("signup process");
//             const { username, email, password } = req.body;
//             const check1:any = await User.findOne({username: username});
//             const check2:any = await User.findOne({email: email});
//             if (!check1 && !check2){
//                 const hashPwd = await bcrypt.hash(password,3);
//                 console.log(hashPwd);
//                 const result = await User.create({username: username, email:email, password:hashPwd});
//                 console.log('Signup successfully',result);
//                 return res.status(200).json({message: "OK"});
//             }
//             else if (check1 || check2){
//                 return res.status(400).json({message: "Username or email already exist"});
//             }
//         } catch(err) {
//             console.error(err);
//             return res.status(400).json({message: "server problem"});
//         }
//     }
//     async login(req:any, res:any) {
//         try {
//             console.log("login process");
//             console.log("ddfd",req.body);
//             const { username, password } = req.body;
//             console.log("ddfd",req.body);
//             const result: any = await User.findOne({username: username});
//             console.log(result);
//             if(!username) {
//                 return res.status(200).json({message: "Wrong username"});
//             }
//             const pwdMatch = await bcrypt.compare(password, result.password)
//             if(pwdMatch) {
//                 console.log('Login result',result);                
//                 const token = jwt.sign({id:result._id},'appinventiv',{expiresIn: '6h'});
//                 console.log(token); 
//                 let session_payload:any={
//                     user_id:result._id,
//                     device_id:"1234",
//                     device_type:"google chrome",
//                     isSessionActive: true
//                 }
//                 await sessionModel.insertMany([
//                     session_payload
//                 ])
//                 await client.set(`${result._id}_session`,JSON.stringify(session_payload))
//                 return res.send({message:"User Login Succesfully",token:token})
//             }
//             return res.status(400).json({message: "Incorrect Password"});
//         } catch(err) {
//             console.error(err);
//         }
//     }
// }
// export const authController = new AuthController();
