import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getPromotionStat() {
    return this.http.get(`${environment.api}/stat/promotion`);
  }

  getCityStat() {
    return this.http.get(`${environment.api}/stat/city`);
  }
}
