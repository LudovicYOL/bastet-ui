import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    firstName: '',
    lastName: '',
    password: ''
  };

  promotions = [];

  constructor(private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generatePromotions();
  }

  generatePromotions() {
    let year = 2009;
    const actualYear = new Date().getFullYear();
    while (year <= actualYear + 5) {
      this.promotions.push(year);
      year++;
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une adresse mail' :
      this.email.hasError('email') ? 'Adresse mail invalide' :
        '';
  }

  register() {
    if (this.credentials.email !== '' &&
      this.credentials.password !== '' &&
      this.credentials.firstName !== '' &&
      this.credentials.lastName !== '' &&
      this.credentials.promotion) {

      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/home');
      }, (err) => {
        let message = 'Erreur lors de l\'enregistrement du compte !';
        if (err.status === 409) {
          message = 'Un compte avec ce mail existe déjà !';
        }
        this.snackBar.open(message, 'FERMER', {
          duration: 3000,
        });
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'FERMER', {
        duration: 3000,
      });
    }
  }
}

