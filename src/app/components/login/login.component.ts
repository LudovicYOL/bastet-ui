import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une adresse mail' :
      this.email.hasError('email') ? 'Adresse mail invalide' :
        '';
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }
}

