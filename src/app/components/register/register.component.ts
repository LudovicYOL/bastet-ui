import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  credentials: TokenPayload = {
    email: '',
    name: '',
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

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}

