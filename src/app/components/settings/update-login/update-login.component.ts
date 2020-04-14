import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-login',
  templateUrl: './update-login.component.html',
  styleUrls: ['./update-login.component.scss']
})
export class UpdateLoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email = '';
  password = '';


  constructor(public dialogRef: MatDialogRef<UpdateLoginComponent>,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  update(): void {
    if (this.email !== '' && this.password !== '' && this.emailFormControl.valid) {
      const account = {
        id: this.authenticationService.getUserDetails()._id,
        email: this.email,
        password: this.password,
      };
      this.authenticationService.updateLogin(account).subscribe((data) => {
        this.authenticationService.logout();
      }, (err) => {
        this.snackBar.open('Mot de passe invalide', 'FERMER', {
          duration: 3000,
        });
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'FERMER', {
        duration: 3000,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'Ce champ est requis' :
      this.emailFormControl.hasError('email') ? 'Email non valide' :
        '';
  }

}
