import { Schema, model, Document, Types } from 'mongoose';

// follow schema
interface Follow extends Document {
  sender_id: Types.ObjectId;
  receiver_id: Types.ObjectId;
  status: string;

}

export enum followStatus{
    'Pending' = 'Pending',
  'Accepted' = 'Accepted',
  'Rejected' = 'Rejected'
}

const followSchema = new Schema<Follow>({
    sender_id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    receiver_id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    status:{
        enum:Object.values(followStatus),
        type:String
    }
},
{ timestamps: { createdAt: 'created_at' } });

export default model<Follow>('follow_infos', followSchema);