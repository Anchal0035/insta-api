import { Schema, model, Document } from 'mongoose';


// User schema
interface User extends Document {
  username: string;
  email: string;
  password: string;
  profile_picture: string;
  bio: string;
  followers: number;
  following: number;
  post: number;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    default: 'I am new user'
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  post: {
    type: Number,
    default: 0
  }
});
export default model<User>('users', userSchema);//ask
