import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateLoginComponent } from './update-login/update-login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  account;

  constructor(public dialog: MatDialog, public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.account = this.authenticationService.getUserDetails();
  }

  // Modification de l'identifiant
  openUpdateLoginDialog(): void {
    const updateLoginDialogRef = this.dialog.open(UpdateLoginComponent, {
      id: 'update-login-dialog',
      ariaLabel: 'update-login-dialog',
    });
  }

  // Modification du mot de passe
  openUpdatePasswordDialog(): void {
    const updatePasswordDialogRef = this.dialog.open(UpdatePasswordComponent, {
      id: 'update-password-dialog',
      ariaLabel: 'update-login-dialog',
    });
  }
}
