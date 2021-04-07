import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../shared/models/IPost';
import { NoteService } from '../shared/services/note.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  formType: any;
  updatedPost: IPost;

  constructor(
    private $fb: FormBuilder,
    private $note: NoteService,
    private $shared: SharedService,
    private $activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formType = this.$activatedRoute.snapshot.params.id;
    if (this.formType === 'new') {
      this.initializeForm('new');
    } else {
      this.$note.getPostById(this.formType).subscribe((data) => {
        if (data.success) {
          this.initializeForm(data.results);
        }
      });
    }
  }

  initializeForm(type: any): void {
    if (type === 'new') {
      this.postForm = this.$fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    } else {
      this.updatedPost = type;
      this.postForm = this.$fb.group({
        title: [type.title, Validators.required],
        description: [type.description, Validators.required],
      });
    }
  }

  routeTo(path: string): void {
    this.$shared.routeTo(path.toLowerCase());
  }

  onSubmit(): void {
    if (this.formType === 'new') {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  createPost(): void {
    const newPost: IPost = {
      title: this.postForm.controls.title.value,
      description: this.postForm.controls.description.value,
      author: JSON.parse(localStorage.getItem('user')).name,
    };

    this.$note.createPost(newPost).subscribe((data) => {
      if (data.success) {
        this.postForm.reset();
      }
    });
  }

  updatePost(): void {
    this.updatedPost.title = this.postForm.controls.title.value;
    this.updatedPost.description = this.postForm.controls.description.value;
    this.updatedPost.author = JSON.parse(localStorage.getItem('user')).name;
    console.log(this.updatedPost);

    this.$note.updatePost(this.updatedPost).subscribe((data) => {
      if (data.success) {
        this.postForm.reset();
        this.$shared.routeTo('posts');
      }
    });
  }
}
