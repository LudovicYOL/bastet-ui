import { far } from '@fortawesome/free-regular-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Needed modules
import { MaterialModule } from './core/material.module';
import { ChartsModule } from 'ng2-charts';

// Custom module
// TODO : créer un module pour les icones
import { FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


// Authentification
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

// Services
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { MissionService } from './services/mission.service';

// Components
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StatisticComponent } from './components/statistic/statistic.component';

// Dialog
import { EditContactDialogComponent } from './components/profile/edit-contact-dialog/edit-contact-dialog.component';
import { EditMainDialogComponent } from './components/profile/edit-main-dialog/edit-main-dialog.component';
import { AddMissionDialogComponent } from './components/profile/add-mission-dialog/add-mission-dialog.component';
import { DeleteMissionDialogComponent } from './components/profile/delete-mission-dialog/delete-mission-dialog.component';

import { UpdateLoginComponent } from './components/settings/update-login/update-login.component';
import { UpdatePasswordComponent } from './components/settings/update-password/update-password.component';

// Pipes
import { NotDisclosedPipe } from './components/pipes/not-disclosed.pipe';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { HistoryComponent } from './components/home/history/history.component';
import { PromotionChartComponent } from './components/statistic/promotion-chart/promotion-chart.component';
import { CityChartComponent } from './components/statistic/city-chart/city-chart.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AuthGuardService], children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'annuaire', component: AnnuaireComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'statistic', component: StatisticComponent, canActivate: [AuthGuardService] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, data: { animation: 'RegisterPage' } },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    MenuComponent,
    AnnuaireComponent,
    SettingsComponent,
    NotFoundComponent,
    EditContactDialogComponent,
    EditMainDialogComponent,
    NotDisclosedPipe,
    AddMissionDialogComponent,
    DeleteMissionDialogComponent,
    UpdateLoginComponent,
    UpdatePasswordComponent,
    StatisticComponent,
    WelcomeComponent,
    HistoryComponent,
    PromotionChartComponent,
    CityChartComponent,
  ],
  entryComponents: [
    EditContactDialogComponent,
    EditMainDialogComponent,
    AddMissionDialogComponent,
    DeleteMissionDialogComponent,
    UpdateLoginComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    ChartsModule,
  ],
  providers: [
    UserService,
    MissionService,
    AuthGuardService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
}
