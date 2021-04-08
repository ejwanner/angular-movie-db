import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'movie-db-angular-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'Hello World';
  onAddPost() {
    this.newPost = this.enteredValue;
  }


}
