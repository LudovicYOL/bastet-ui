import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User;
  user: any;

  constructor(private userService: UserService, public auth: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getProfile().subscribe((data: User) => {
      this.profile = data;
    }, (err) => {
      console.error(err);
    });

    const descriptionTemp = 'Je suis Product Owner sur le projet innovant de mon entreprise Eole Consulting : Hygia.' +
    'L\'objectif est de créer un environnement de santé autour du patient.';

    this.user = {
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

  openEditContactDialog(): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      id: 'update-contact-dialog',
      data: this.user,
      ariaLabel: 'contact-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openLinkInNewTab(page) {
    window.open('http://' + page, '_newtab');
  }

  getInitiales(user) {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }

  canEdit() {
    // remplacer par id et pas email
    return this.auth.getUserDetails().email === this.user.email;
  }

}
