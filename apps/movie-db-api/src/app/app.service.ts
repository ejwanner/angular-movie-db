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
    return await post.save();
  }

  async updatePost(postData: any, postId: string) {
    const post = new this.postModel({
      _id: postId,
      title: postData.title,
      content: postData.content
    });
    return await this.postModel.updateOne({_id: postId}, post)
  }

  async getPostById(postId: string) {
    const rightPost = await this.postModel.findById(postId);
    return rightPost;
  }

  async deleteOnePost(postId: string) {
    const result = await this.postModel.deleteOne({_id: postId})
    return result;
  }
}
