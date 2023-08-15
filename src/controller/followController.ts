import { Types } from "mongoose";
import Follow, { followStatus } from "../database/models/follow-model";
import User from "../database/models/users-model";
import express = require("express");
import { Request,Response } from "express";


class FollowController{
    async follow(req:Request,res:Response){
        try{
            const sender_id=req.body.id;
            const {receiver_id,status}=req.body;
            const checkReceiver=await User.findOne({_id:receiver_id});
            console.log('checkReceiver ', checkReceiver);
            if (checkReceiver) {
            const checkFollowInfo=await Follow.findOne({sender_id:sender_id,receiver_id:receiver_id});
            console.log('checkFollowInfo ', checkFollowInfo);
            const checkStatus= status===followStatus.Rejected;
            console.log('checkStatus ', checkStatus);
                const filter1 = { _id: sender_id };
                const update1 = { $inc: { following: 1 } };
                const filter2 = { _id: receiver_id };
                const update2 = { $inc: { followers: 1 } };
                console.log("filter1=",filter1);
                console.log("update1=",update1);
                const q3: any = await User.findOne({ _id: sender_id })
                console.log('user ', q3)
                if (sender_id === receiver_id) {
                    return res.status(400).send("You don't send request to your self")
                }
                else if (!checkFollowInfo) {
                    const follow = await Follow.create({ sender_id, receiver_id, status });
                    console.log('Request send', follow);
                    await User.updateOne(filter1, update1);
                    await User.updateOne(filter2, update2);
                    const q2: any = await User.findOne({ _id: sender_id });
                    console.log('user1 ', q2)
                    return res.status(200).json({ message: "Request send" });
                }
                else if (checkFollowInfo && checkStatus) {
                    const follow = await Follow.create({ sender_id, receiver_id, status });
                    console.log('Request resend', follow);
                    await User.updateOne(filter1, update1);
                    await User.updateOne(filter2, update2);
                    const q1: any = await User.findOne({ _id: sender_id })
                    console.log('user2 ', q1);
                    return res.status(200).json({ message: "Request resend" });
                }
                return res.status(400).json({ message: "Your request is pending or Accepted" });
            }
            return res.status(400).json({ message: "User not exit" });
        }
        catch(err){
            console.error(err);
            return res.status(400).json({message: "server problem"});
        }

    }

    async unfollow(req: any, res: any) {
        try {
            const sender_id = req.body.id;
            console.log(sender_id);
            const { receiver_id } = req.body;
            const check1: any = await User.findOne({ _id: receiver_id });
            console.log('check 1 ', check1)
            if (check1) {
                const check2: any = await Follow.findOne({ sender_id: sender_id, receiver_id: receiver_id });
                console.log('check 2 ', check2)
                const check3 = (check2 === null) || (check2.status === followStatus.Accepted);
                console.log('check 3 ', check3);
                const filter1 = { _id: sender_id };
                const update1 = { $inc: { following: -1 } };
                const filter2 = { _id: receiver_id };
                const update2 = { $inc: { followers: -1 } };
                if (sender_id === receiver_id) {
                    return res.status(400).send("This is your id and you don't unfollow yourself")
                }
                else if (check2 && check3) {
                    const filter = { _id: check2._id };
                    const unfollow = await Follow.deleteOne(filter);
                    console.log('Unfollowed', unfollow);
                    const check3: any = await Follow.findOne({ sender_id: sender_id, receiver_id: receiver_id });
                    console.log('check 3 ', check3)
                    await User.updateOne(filter1, update1);
                    await User.updateOne(filter2, update2);
                    return res.status(200).json({ message: "Unfollowed" });
                }
                return res.status(400).json({ message: "You don't follow him" });
            }
            return res.status(400).json({ message: "User not exit" });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "server problem" });
        }
    }

    async following_list(req: any, res: any) {
        try {
            const sender_id = req.body.id;
            console.log(sender_id);
            let pipeline = [];
            pipeline.push({$match: {status: followStatus.Accepted}})
            pipeline.push({$match: {sender_id: new Types.ObjectId(sender_id)}})    
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
              })
            let c = await Follow.aggregate(pipeline)
            console.log(c);
            res.status(200).send(c);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "server problem" });
        }
    }

    async follower_list(req: any, res: any) {
        try {
            const sender_id = req.body.id;
            console.log(sender_id);
            let pipeline = [];
            pipeline.push({$match:{status: followStatus.Accepted}})
            pipeline.push({$match:{receiver_id: new Types.ObjectId(sender_id)}})
            pipeline.push({
                $lookup: {
                    from: 'users',
                    localField: "sender_id",
                    foreignField: "_id",
                    as: "user"
                }
            })
            pipeline.push({
                $project: {

                    sender_id: 1,
                    'user.username': 1,
                },
              })
            let c = await Follow.aggregate(pipeline)
            res.status(200).send(c);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "server problem" });
        }
    }
}

export const followController=new FollowController();