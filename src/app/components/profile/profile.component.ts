import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User;
  user: any;

  constructor(private userService: UserService) { }

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
      facebook: '',
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

  openLinkInNewTab(page) {
    window.open(page, '_newtab');
  }

  getInitiales(user) {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }
}
