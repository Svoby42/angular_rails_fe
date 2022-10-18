import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] | undefined;

  constructor(private postService: PostService, public router: Router) { }

  ngOnInit(): void {
    this.postService.getTenNewestPosts().subscribe((res) => {
      this.posts = res
      console.log(this.posts);
    })
  }

}
