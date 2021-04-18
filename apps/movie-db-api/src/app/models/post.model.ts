import * as mongoose from 'mongoose';
import { Document } from "mongoose";


export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

export interface PostModel extends Document{
  id: string;
  title: string;
  content: string;
}
