import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInOutAnimation
  ]
})

export class AppComponent {
  title = 'Bastet';
  constructor(public auth: AuthenticationService) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
