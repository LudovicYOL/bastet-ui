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

}
