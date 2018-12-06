import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})

export class AnnuaireComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchProfiles();
  }

  fetchProfiles() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  getInitiales(user) {
    // TODO : remplacer user.name par user.firstname et user.email par user.lastname
    return user.name.charAt(0) + user.email.charAt(0);
  }

  getRandomBackgroundColor() {
    const colors = ['yellow', 'blue', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
