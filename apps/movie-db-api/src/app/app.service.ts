import { Injectable } from '@nestjs/common';
import { PostDto } from "./dto/post.dto";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostModel } from "./models/post.model";

@Injectable()
export class AppService {

  constructor(@InjectModel('Post') private readonly postModel: Model<PostModel>) {}

  async getData(){
    const posts = await this.postModel.find();
    console.log(posts);
    return posts;
  }

  async addPost(postData: any) {
    const post = new this.postModel({
      title: postData.title,
      content: postData.content
    });
    const posts = await post.save().then(result => {
      return result._id; // TODO hier weiter machen mit der _id und Mongo Credentials wieder reinkopieren
    })
    return posts;
  }

  async deleteOnePost(postId: string) {
    const result = await this.postModel.deleteOne({_id: postId})
    return result;
  }
}
