import Post from "../database/models/post-model";
import User from "../database/models/users-model";

class PostController {

    async post(req:any, res:any) {
        try {
            const user_id= req.body.id;
            const {media, caption } = req.body;
            const post = await Post.create({user_id,media,caption});
            const filter1 = { _id: user_id };
            const update1 = { $inc: { post: 1 } };
            await User.updateOne(filter1, update1);
            console.log('post uploaded',post);
            return res.status(200).json({message: "post uploaded"});
        } catch(err) {
            console.error(err);
            return res.status(400).json({message: "server problem"});
        }
    }
}

export const postController = new PostController();