import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  actualPassword = "";
  newPassword = "";
  newPasswordBis = "";

  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  update(): void{
    if (this.actualPassword !== '' && this.newPassword !== '' && this.newPasswordBis !== '') {
      if(this.newPassword != this.newPasswordBis){
        this.snackBar.open('Les mots de passe ne correspondent pas', 'FERMER', {
          duration: 3000,
        });
      }else{
        let account = {
          id: this.authenticationService.getUserDetails()._id,
          actualPassword : this.actualPassword,
          newPassword : this.newPassword,
        }
        this.authenticationService.updatePassword(account).subscribe((data)=>{
          this.authenticationService.logout();
        }, (err) => {
          this.snackBar.open('Mot de passe actuel invalide', 'FERMER', {
            duration: 3000,
          });
        });
      }
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'FERMER', {
        duration: 3000,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
