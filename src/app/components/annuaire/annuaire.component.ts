import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})

export class AnnuaireComponent implements OnInit {


  @ViewChild('searchInput') searchInput: ElementRef;
  users: any;
  isSearching: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isSearching = false;
    this.users = [];
  }

  ngOnInit() {
    // Initialisation
    this.fetchProfiles();

    // Méthode de recherche
    // Debounce : https://www.freakyjolly.com/angular-7-6-add-debounce-time-using-rxjs-6-x-x-to-optimize-search-input-for-api-results-from-server/#more-2229
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      //, filter(res => res.length > 2)
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      if(text.length == 0){
        this.fetchProfiles();
      }else{
        this.isSearching = true;
        this.userService
          .searchUsers(text).subscribe((res) => {
            this.isSearching = false;
            this.users = res;
          }, (err) => {
            this.isSearching = false;
          });
      }
    });
  }

  fetchProfiles() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  getInitiales(user) {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }

  goToUserProfile(id) {
    this.router.navigate(['/profile/' + id]);
  }
}
