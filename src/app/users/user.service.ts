import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  private apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = environment.baseURL;
  }

  public getUsers(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}users`);
  }

  public addUser(data: any): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}users`);
  }

  public removeUser(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}users/${id}`);
  }
}
