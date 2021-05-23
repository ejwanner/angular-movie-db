import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostSchema } from './models/post.model';

@Module({
  imports: [
    /*ServeStaticModule.forRoot({
      rootPath: join('images'),
    }),*/
    MongooseModule.forRoot('mongodb+srv://movie-admin:GKwUDvH6fknzyazL@cluster0.fyszm.mongodb.net/moviedb?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
