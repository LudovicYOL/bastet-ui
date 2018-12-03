import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './core/material.module';

import { IssueService } from './services/issue.service';
import { AuthGuardService } from './services/auth-guard.service';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssuesCreateComponent } from './components/issues-create/issues-create.component';
import { IssuesEditComponent } from './components/issues-edit/issues-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AuthGuardService], children: [
      { path: 'accueil', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'issues/create', component: IssuesCreateComponent, canActivate: [AuthGuardService] },
      { path: 'issues/edit/:id', component: IssuesEditComponent, canActivate: [AuthGuardService] },
      { path: 'issues/list', component: IssuesListComponent, canActivate: [AuthGuardService] },
      { path: 'issues', redirectTo: 'issues/list', pathMatch: 'full', canActivate: [AuthGuardService] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [IssueService, AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
