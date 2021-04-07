import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/services/note.service';
import { SharedService } from '../shared/services/shared.service';
import { IPost } from '../shared/models/IPost';
import { IUser } from '../shared/models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  user: IUser;
  pageTitle: string;

  constructor(
    private $shared: SharedService,
    private $note: NoteService,
    private $router: Router
  ) {}

  ngOnInit(): void {
    this.resolvePage();
  }

  resolvePage(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.$router.url.toLowerCase() === '/my-posts') {
      this.getPostsByAuthor(this.user.name);
      this.pageTitle = 'your feeds';
    } else {
      this.getAllPosts();
      this.pageTitle = `world's feeds`;
    }
  }

  routeTo(path: string, params: any): void {
    if (params === null) {
      this.$shared.routeTo(path.toLowerCase());
    } else {
      this.$shared.routeTo(path.toLowerCase(), params);
    }
  }

  getAllPosts(): void {
    this.$note.getAllPosts().subscribe((data) => {
      if (data.success) {
        this.posts = data.results;
      }
    });
  }

  getPostsByAuthor(author: string): void {
    this.$note.getPostsByAuthor(author).subscribe((data) => {
      if (data.success) {
        this.posts = data.results;
      }
    });
  }

  deletePost(post: IPost): void {
    this.$note.deletePost(post).subscribe((data) => {
      if (data.success) {
        this.resolvePage();
      }
    });
  }
}
