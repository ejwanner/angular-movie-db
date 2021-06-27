import { Component, OnInit } from '@angular/core';

import { Post } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'movie-db-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
