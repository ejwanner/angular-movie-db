import { Document } from 'mongoose';

export interface PostModel extends Document{
  _id: string;
  title: string;
  content: string;
  imagePath: string;
}
