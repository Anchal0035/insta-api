import { Schema, model, Document, Types } from 'mongoose';

// follow schema
export enum type {
    Likes = 'liked',
    Comment ='Comment'
}

interface Reply {
  user_id: Types.ObjectId;
  action_id: Types.ObjectId;
  reply_text: string;
}

const replySchema = new Schema<Reply>({
  user_id: {
      type: Schema.Types.ObjectId,
      required: true
  },
  action_id: {
      type: Schema.Types.ObjectId,
      ref: 'actionSchema',
      required: true
  },
  reply_text: {
      type: String,
      required: true
  } 
})

interface Action extends Document {
  post_id: Types.ObjectId;
  user_id: Types.ObjectId;
  action_type: string;
  content: string;
  created_at: Date;
  reply: string[];
}
  
const actionSchema = new Schema<Action>({

  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  action_type: {
    type: String,
    enum: Object.values(type),
  },
  content: {
    type: String
  },
  reply: [replySchema],
});

export default model<Action>('actions', actionSchema);
