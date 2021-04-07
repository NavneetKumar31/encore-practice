import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../models/IApiResult';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteApi = 'http://localhost:3000/notes/';

  constructor(private $http: HttpClient) {}

  getAllPosts(): Observable<IApiResponse> {
    return this.$http.get<IApiResponse>(this.noteApi);
  }

  getPostsByAuthor(author: any): Observable<IApiResponse> {
    return this.$http.get<IApiResponse>(this.noteApi + 'byAuthor/' + author);
  }

  getPostById(id: any): Observable<IApiResponse> {
    return this.$http.get<IApiResponse>(this.noteApi + id);
  }

  createPost(newPost: any): Observable<IApiResponse> {
    return this.$http.post<IApiResponse>(this.noteApi, newPost);
  }

  updatePost(updatedPost: any): Observable<IApiResponse> {
    return this.$http.patch<IApiResponse>(
      this.noteApi + updatedPost._id,
      updatedPost
    );
  }

  deletePost(deletedPost: any): Observable<IApiResponse> {
    return this.$http.delete<IApiResponse>(this.noteApi + deletedPost._id);
  }
}
