import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/profile.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})

export class AnnuaireComponent implements OnInit {

  profiles: Profile[];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.fetchProfiles();
  }

  fetchProfiles() {
    this.profileService
      .getProfiles()
      .subscribe((data: Profile[]) => {
        console.log(data);
        this.profiles = data;
        console.log(this.profiles);
      });
  }

}
