import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issues-create',
  templateUrl: './issues-create.component.html',
  styleUrls: ['./issues-create.component.scss']
})

export class IssuesCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  addIssue(title, responsible, description, severity) {
    this.issueService.addIssue(title, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/issues/list']);
    });
  }

  ngOnInit() {
  }
}
