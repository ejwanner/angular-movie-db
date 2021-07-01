import { Document } from 'mongoose';
import { User } from './user.interface';

export interface PostModel extends Document{
  _id: string;
  title: string;
  content: string;
 // imagePath: string;
  creator: User;
}
