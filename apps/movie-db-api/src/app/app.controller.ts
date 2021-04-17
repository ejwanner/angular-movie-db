import { Controller, Get, Post, Res, Header } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('posts')
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  // @Header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  // getData(@Res() res: any) {
  //   const posts = this.appService.getData();
  //   res.json({ message: 'here are the posts', posts: posts})
  // }
  @Post('posts')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  getData(@Res() res: any) {
    const posts = this.appService.getData();
    res.json({ message: 'here are the posts', posts: posts})
  }
}
