import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  getMissionByUser(id) {
    return this.http.get(`${environment.api}/mission/` + id);
  }

  delete(id) {
    return this.http.delete(`${environment.api}/mission/` + id);
  }

  addToUser(mission, user) {
    return this.http.post(`${environment.api}/mission/` + user._id, mission);
  }
}
