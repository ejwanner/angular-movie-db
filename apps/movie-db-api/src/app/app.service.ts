import { Injectable } from '@nestjs/common';
import { PostDto } from "./dto/post.dto";

@Injectable()
export class AppService {
  getData(){
    const posts: PostDto[] = [
      {
        id:  'naf78324i23nls',
        title: 'Test Title 1',
        content: 'here is the Test Content from the Backend'
      },
      {
        id:  'fa46gf354t',
        title: 'Test Title 2',
        content: 'here is the second Test Content from the Backend'
      }
    ];
    return posts;
  }
}
