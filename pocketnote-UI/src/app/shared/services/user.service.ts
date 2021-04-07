import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IApiResponse } from '../models/IApiResult';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi = 'http://localhost:3000/users/';
  isUserLoggedIn = new Subject<boolean>();

  constructor(private $http: HttpClient) {}

  userLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn.next(true);
      return true;
    }

    this.isUserLoggedIn.next(false);
    return false;
  }

  registerUser(newUser: any): Observable<IApiResponse> {
    return this.$http.post<IApiResponse>(this.userApi, newUser);
  }

  authenticateUser(user: any): Observable<IApiResponse> {
    return this.$http.post<IApiResponse>(this.userApi + 'authenticate', user);
  }

  getAllUsers(): Observable<IApiResponse> {
    return this.$http.get<IApiResponse>(this.userApi);
  }

  getUserById(user: any): Observable<IApiResponse> {
    return this.$http.get<IApiResponse>(this.userApi + user.id);
  }

  updateUserById(user: any): Observable<IApiResponse> {
    return this.$http.patch<IApiResponse>(this.userApi + user.id, user);
  }

  deleteUserById(user: any): Observable<IApiResponse> {
    return this.$http.delete<IApiResponse>(this.userApi + user.id);
  }
}
