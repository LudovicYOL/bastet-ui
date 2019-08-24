import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${environment.api}/users`);
  }

  getUserById(id) {
    return this.http.get(`${environment.api}/user/` + id);
  }

  searchUsers(keywords) {
    return this.http.get(`${environment.api}/user/search/` + keywords);
  }

  update(user) {
    return this.http.post(`${environment.api}/user/update`, user);
  }
}
