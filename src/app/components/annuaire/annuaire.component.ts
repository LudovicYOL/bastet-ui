import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})

export class AnnuaireComponent implements AfterViewInit {


  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  users: any;
  isSearching: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isSearching = false;
    this.users = [];
  }

  ngAfterViewInit() {
    // Initialisation
    this.fetchProfiles();

    // Méthode de recherche (avec debounce)
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      if (text.length === 0) {
        this.fetchProfiles();
      } else {
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
