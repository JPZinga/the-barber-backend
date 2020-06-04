
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

import {IAdress} from './Adress';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  adress: IAdress['_id'];
  createAt: Date;
}

const UserSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
    select: false,
  },

  adress: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "AdressModel"
  },
  
  createAt: { 
    type: Date, 
    default: Date.now(), 
  },

});

UserSchema.pre<IUser>("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 13);
  this.password = hash;

  next();
});

export default mongoose.model<IUser>('User', UserSchema);
