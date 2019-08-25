import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Ce champ est requis' :
      this.email.hasError('email') ? 'Email non valide' :
        '';
  }

  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    if (this.user.email !== '') {
      this.userService.update(this.user).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'FERMER', {
        duration: 3000,
      });
    }
  }
}
