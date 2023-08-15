import Action, { type } from "../database/models/action-model";
import Post from "../database/models/post-model";

class ActionController {

    async action(req:any, res:any) {
        try {
            const user_id= req.body.id;
            const { post_id, action_type,content } = req.body;
            const check1: any = await Post.findOne({ _id: post_id });
            console.log('check 1 ', check1)
            if (check1) {
                const filter1 = { _id: post_id };
                const update1 = { $inc: { comment_count: 1 } };
                const update2 = { $inc: { likes_count: 1 } }; 
                if(action_type ===type.Comment && (content == null || content === "")){
                    return res.status(400).send({message: "Comment is missing"});
                } else if(action_type ===type.Likes){
                    const check2 = await Action.findOne({post_id: post_id, user_id: user_id});
                    const check3 = await Action.findOne({action_type: type.Likes});
                    console.log('check 2 ', check2)
                    console.log('check 3 ', check3)
                    if(check2 && check3){
                        return res.status(400).send("You already liked the post")
                    }
                    const action = await Action.create({ post_id, user_id, action_type });
                    await Post.updateOne(filter1, update2);
                        console.log('Liked',action);
                        return res.status(200).send({message: "Liked"});
                } else if(action_type ==="Comment" && content != null){
                    const action = await Action.create({ post_id, user_id,action_type,content });
                    await Post.updateOne(filter1, update1);
                    console.log('Commented',action);
                    return res.status(200).send({message: "Commented"});
                }
                

            }
            return res.status(400).send("Wrong post id");
        } catch(err) {
            console.error(err);
            return res.status(400).send("Server problem")
        }
    }

    async allComment(req: any, res: any) {
        try {
            const { post_id } = req.body;
            const check: any = await Post.findOne({ _id: post_id });
            console.log('check ', check)
            if(check){
                const result: any = await Action.find({ post_id: post_id, action_type: type.Comment }).select('content');
                console.error(result);
                return res.status(400).json({result});
            }
            return res.status(400).send("Wrong post id")
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "server problem" });
        }
    }

    async allLikes(req: any, res: any) {
        try {
            const { post_id } = req.body;
            const check: any = await Post.findOne({ _id: post_id });
            console.log('check ', check)
            if(check){
                const result: any = await Action.find({ post_id: post_id, action_type: type.Likes }).select('user_id');
                console.error(result);
                return res.status(400).json({result});
            }
            return res.status(400).send("Wrong post id")
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "server problem" });
        }
    }


}

export const actionController = new ActionController();