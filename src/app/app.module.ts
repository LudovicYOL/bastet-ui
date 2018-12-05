import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { MaterialModule } from './core/material.module';

import { AuthGuardService } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { IssueService } from './services/issue.service';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssuesCreateComponent } from './components/issues-create/issues-create.component';
import { IssuesEditComponent } from './components/issues-edit/issues-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { MenuComponent } from './components/menu/menu.component';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AuthGuardService], children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'annuaire', component: AnnuaireComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'issues/create', component: IssuesCreateComponent, canActivate: [AuthGuardService] },
      { path: 'issues/edit/:id', component: IssuesEditComponent, canActivate: [AuthGuardService] },
      { path: 'issues/list', component: IssuesListComponent, canActivate: [AuthGuardService] },
      { path: 'issues', redirectTo: 'issues/list', pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, data: {animation: 'RegisterPage'} },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    IssuesCreateComponent,
    IssuesEditComponent,
    IssuesListComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    MenuComponent,
    AnnuaireComponent,
    SettingsComponent,
    NotFoundComponent
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
    FontAwesomeModule
  ],
  providers: [
    IssueService,
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
  constructor() {
    library.add(fas, far, fab);
  }
}
