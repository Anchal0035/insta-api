// import mongoose  from "mongoose"
// const sessionSchema = new mongoose.Schema({
//     user_id:{type:String},
//     session_id:{type:String},
//     device_type:{type:String},
//     device_id:{type:String}
// })
// export const sessionModel = mongoose.model('Session',sessionSchema)
import { Schema, model, Document, Types } from 'mongoose';
import user from './users-model';

// post schema
interface Session extends Document {
  user_id: Types.ObjectId;
  device_type: string;
  device_id: string;
}

const sessionSchema = new Schema<Session>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  device_type: {
    type: String,
    required: true
  },
  device_id: {
    type: String,
    required: true
  }
},
{timestamps:
     { createdAt: 'created_at'}
});


export default model<Session>('Session', sessionSchema);
