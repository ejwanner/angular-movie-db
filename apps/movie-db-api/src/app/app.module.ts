import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostSchema } from './models/post.model';
import { UserSchema } from './models/user.model';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    /*ServeStaticModule.forRoot({
      rootPath: join('images'),
    }),*/
    MongooseModule.forRoot('mongodb+srv://movie-admin:GKwUDvH6fknzyazL@cluster0.fyszm.mongodb.net/moviedb'),
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema }
    ]),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
