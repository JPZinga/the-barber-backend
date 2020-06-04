import mongoose, { Schema, Document } from 'mongoose';

export interface IAdress extends Document {
  city: string;
  street: string;
  createAt: Date;
}

const AdressShema: Schema = new Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  referenceDescription: String,

  createAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IAdress>('Adress', AdressShema);