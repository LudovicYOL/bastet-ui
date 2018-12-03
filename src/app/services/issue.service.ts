import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  constructor(private http: HttpClient) {
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${environment.api}/issues/add`, issue);
  }

  getIssues() {
    return this.http.get(`${environment.api}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${environment.api}/issues/${id}`);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${environment.api}/issues/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${environment.api}/issues/delete/${id}`);
  }
}
