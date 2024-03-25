import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export interface Person extends mongoose.Document {
  constructor;
  id: string;
  name: string;
  age: number;
}
