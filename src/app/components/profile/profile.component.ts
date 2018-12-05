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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe((data: User) => {
      this.profile = data;
    }, (err) => {
      console.error(err);
    });
  }
}
