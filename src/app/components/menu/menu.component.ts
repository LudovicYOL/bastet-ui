import { Component, OnInit } from '@angular/core';
import { MediaObserver , MediaChange } from '@angular/flex-layout';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  // overlap = false;

  watcher: Subscription;

  constructor(private auth: AuthenticationService, media: MediaObserver ) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

  isAdmin(): boolean {
    return this.auth.getUserDetails().role === 'ADMIN';
  }
}
