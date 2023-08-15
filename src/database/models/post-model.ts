import { Schema, model, Document, Types } from 'mongoose';
import user from './users-model';

// post schema
interface Media {
  url: string;
}

interface Post extends Document {
  user_id: Types.ObjectId;
  media: string[];
  caption: string;
  likes_count: number;
  comment_count: number;
}

const mediaSchema = new Schema<Media>({
    url:{
        type: String,
        required: true,
    }
})

const postSchema = new Schema<Post>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  media: [mediaSchema],
  caption: {
    type: String
  },
  likes_count: {            
    type: Number,
    default: 0
  },
  comment_count: {
    type: Number,
    default: 0
  }
},{timestamps: { createdAt: 'created_at'}});
export default model<Post>('posts', postSchema);
