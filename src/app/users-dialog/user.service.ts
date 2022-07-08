import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../users/model/user.modal';

@Injectable()
export class UserService {

  private apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = environment.baseURL;
  }

  public getUsers(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}users`);
  }

  public getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}users/${id}`)
  }

  public addUser(data: User): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}users`, data);
  }


  public updateUser(data: User, id: string): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}users/${id}`, data);
  }

  public removeUser(id: string): Observable<User> {
    return this._http.delete<User>(`${this.apiUrl}users/${id}`);
  }
}
