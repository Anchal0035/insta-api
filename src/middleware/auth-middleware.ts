// import { NextFunction, Request, Response } from "express";
// import jwt from 'jsonwebtoken';

// export default function auth(req:any,res:Response,next:NextFunction){
//     const token = req.headers.authorization;
//     console.log(token);
//     if(!token) return res.status(401).send("ACCESS_DENIED");
//     try{
//         const decoded :any = jwt.verify(token,'appinventiv');
//         console.log(decoded);
//         req.body.id= decoded.id;
//         next();
//     }catch(err:any){
//         res.status(400).send("INVALID_TOKEN")
//     }
// }


import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createClient } from "redis";
import sessionModel  from "../database/models/session-model";

const client = createClient()

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
console.log("Auth started1");
export default  async function auth(req:Request,res:Response,next:NextFunction){
    console.log("Auth started2");
    const token: any = req.headers.authorization;//taking token from key authorization
    const verifyToken :any = jwt.verify(token,'secretkey');//get ID as it gives id, iat, exp
    console.log("verifytoken",verifyToken);//gives id, iat, exp
    
    if(verifyToken.id){
        let findSession:any = await client.get(`${verifyToken.id}_session`) || await sessionModel.find(verifyToken.id)// take from redis client || from session 
        if(findSession.length!=0){
            req.body.id= verifyToken.id;
            next()
        }
        else{
            res.send("Session out")
        }

    }else{
        res.send({message:"invalid token"})
    }
    console.log("Auth over");
}