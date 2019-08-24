import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une adresse mail' :
      this.email.hasError('email') ? 'Adresse mail invalide' :
        '';
  }

  login() {
    if (this.credentials.email !== '' &&
      this.credentials.password !== '') {
        this.auth.login(this.credentials).subscribe(() => {
          this.router.navigateByUrl('/profile');
        }, (err) => {
          this.snackBar.open('Oups ! Vos identifiants sont incorrects !', 'FERMER', {
            duration: 3000,
          });
        });
    } else {
      this.snackBar.open('Veuillez saisir vos identifiants', 'FERMER', {
        duration: 3000,
      });
    }
  }
}

