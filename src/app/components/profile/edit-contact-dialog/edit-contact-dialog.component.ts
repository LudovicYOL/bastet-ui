import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface UserContact {
  email: string;
  phone: string;
  city: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
}


@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UserContact) { }

  ngOnInit() {
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
