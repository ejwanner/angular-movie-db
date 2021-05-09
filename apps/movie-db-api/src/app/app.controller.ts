import { Controller, Get, Post, Res, Req, Header, HttpCode, Body, Delete, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  async getData(@Res() res: any) {
    const posts = await this.appService.getData();
    res.json({ message: 'here are the posts', posts: posts});
  }

  @Post('posts')
  @HttpCode(200)
  postData(@Body() body: any, @Res() res: any) {
    const post = this.appService.addPost(body);
    console.log(post);

    res.json({ message: 'Success', post: post});
  }

  @Delete('posts/:id')
  async deleteData(@Param('id') postId: string) {
    return await this.appService.deleteOnePost(postId);
  }
}
