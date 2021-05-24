import { Injectable } from '@nestjs/common';
import { PostDto } from "./dto/post.dto";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostModel } from "./models/post.model";

@Injectable()
export class AppService {

  constructor(@InjectModel('Post') private readonly postModel: Model<PostModel>) {}

  async getData(pageSize: number, currentPage: number){
    pageSize = +pageSize;
    currentPage = +currentPage;
    if (pageSize && currentPage) {
      return await this.postModel.find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .exec();
    }
  }

  async countData() {
    return await this.postModel.count().exec();
  }

  async addPost(postData: any, req: any) {
    const url = req.protocol + '://' + req.get("host");
    const post = new this.postModel({
      title: postData.title,
      content: postData.content,
      imagePath: url + "/src/app/images/" + req.file.filename
    });
    return await post.save();
  }

  async updatePost(postData: any, postId: string, req: any) {
    let imagePath = req.body.imagePath;
    if(req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath: url + "/src/app/images/" + req.file.filename
    }
    const post = new this.postModel({
      _id: postId,
      title: postData.title,
      content: postData.content,
      imagePath: imagePath
    });
    return this.postModel.updateOne({_id: postId}, post)
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
