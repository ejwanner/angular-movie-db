import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostSchema } from './models/post.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../movie-db-api'}),
    MongooseModule.forRoot(''),
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
