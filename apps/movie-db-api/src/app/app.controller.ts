import { Controller, Get, Post, Res, Req, Header, HttpCode, Body, Delete, Param, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  async getData(@Res() res: any) {
    const posts = await this.appService.getData();
    res.json({ message: 'here are all the posts', posts: posts});
  }

  @Post('posts')
  @HttpCode(200)
  async postData(@Body() body: any, @Res() res: any) {
    const post = await this.appService.addPost(body);
    return post;
  }

  @Put('posts/:id')
  async updateData(@Body() body: any, @Param('id') postId: string, @Res() res: any) {
    const updatedPost =  await this.appService.updatePost(body, postId);
    res.json({ message: 'Update was successful!!'});
    console.log(updatedPost);
    return updatedPost;
  }

  @Get('posts/:id')
  async getPost(@Param('id') postId: string) {
    const rightPost = await this.appService.getPostById(postId);
    if(rightPost) {
      return rightPost;
    } else {
      throw new Error('Post not found!');
    }
  }

  @Delete('posts/:id')
  async deleteData(@Param('id') postId: string) {
    return await this.appService.deleteOnePost(postId);
  }
}
