import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  Body,
  Delete,
  Param,
  Put,
  Req, Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


import { AppService } from './app.service';
import { storage } from './file-storage/storage.config';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts')
  async getData(@Res() res: any, @Query('pagesize') pagesize: number, @Query('page') page: number) {
    const fetchedPosts = await this.appService.getData(pagesize, page);
    const count = await this.appService.countData();
    return res.json({
      posts: fetchedPosts,
      maxPosts: count
    });
  }

  @Post('posts')
  //@UseInterceptors(FileInterceptor("file", { storage: storage }))
  @HttpCode(200)
  async postData(@Body() body: any, @Res() res: any, @Req() req: any) {
    const post = await this.appService.addPost(body, req);
    return res.json({
      message: 'Post added successful!',
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        //imagePath: post.imagePath,
        creator: post.creator
      }
    });
  }

  @Put('posts/:id')
  @UseInterceptors(FileInterceptor("file", { storage: storage }))
  async updateData(@UploadedFile() file, @Body() body: any, @Param('id') postId: string, @Res() res: any, @Req() req: any) {
    const updatedPost =  await this.appService.updatePost(body, postId, req);
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
