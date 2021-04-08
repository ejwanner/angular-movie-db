import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../post.service';

@Component({
  selector: 'movie-db-angular-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    this.postsService.addPosts(form.value.title, form.value.content);
    form.resetForm();
  }


}
