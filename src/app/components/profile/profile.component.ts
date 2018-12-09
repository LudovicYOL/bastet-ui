import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { EditMainDialogComponent } from './edit-main-dialog/edit-main-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  profile: any;

  constructor(private userService: UserService, public auth: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchProfile();

    const descriptionTemp = 'Je suis Product Owner sur le projet innovant de mon entreprise Eole Consulting : Hygia.' +
    'L\'objectif est de créer un environnement de santé autour du patient.';

    this.profile = {
      firstName: 'Ludovic',
      lastName: 'YOL',
      promotion: '2016',
      description: descriptionTemp,
      email: 'ludovic.yol@gmail.com',
      phone: '0667347221',
      city: 'Toulouse',
      keywords: ['Agilité', 'Hygia', 'Angular', 'Node'],
      facebook: 'www.google.com',
      twitter: '',
      linkedin: '',
      github: '',
      missions: [
        {
          titre: 'Product Owner',
          entreprise: 'Hygia',
          debut: 'Juillet 2018',
          fin: 'En cours'
        },
        {
          titre: 'Développeur FullStack',
          entreprise: 'Mipih via Eole Consulting',
          debut: 'Septembre 2017',
          fin: 'Juillet 2018'
        },
      ]
    };
  }

  fetchProfile() {
    const id = this.auth.getUserDetails()._id;
    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
    }, (err) => {
      console.error(err);
    });
  }

  // Modification des données générales
  openEditMainDialog(): void {
    const editMainDialogRef = this.dialog.open(EditMainDialogComponent, {
      id: 'update-main-dialog',
      data: this.user,
      ariaLabel: 'main-dialog',
    });

    editMainDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.fetchProfile();
    });
  }

  // Modification des coordonnées
  openEditContactDialog(): void {
    const editContactDialogRef = this.dialog.open(EditContactDialogComponent, {
      id: 'update-contact-dialog',
      data: this.user,
      ariaLabel: 'contact-dialog',
    });

    editContactDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.fetchProfile();
    });
  }

  // Utiles
  openLinkInNewTab(page) {
    window.open('http://' + page, '_newtab');
  }

  getInitiales(user) {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }

  canEdit() {
    if (this.user && this.user.email) {
      return this.auth.getUserDetails().email === this.user.email;
    }
  }

}
