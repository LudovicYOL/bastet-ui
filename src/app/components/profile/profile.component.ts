import { NotDisclosedPipe } from './../pipes/not-disclosed.pipe';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { EditMainDialogComponent } from './edit-main-dialog/edit-main-dialog.component';
import { AddMissionDialogComponent } from './add-mission-dialog/add-mission-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { Mission } from 'src/app/models/mission.model';
import { DeleteMissionDialogComponent } from './delete-mission-dialog/delete-mission-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  missions: Mission[];
  profile: any;

  months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Décembre"];

  constructor(
    private userService: UserService,
    public auth: AuthenticationService,
    public missionService: MissionService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.missions = [];
    this.fetchProfile();
  }

  fetchProfile() {
    // Récupération de l'id du profil à afficher
    // Je vérifie d'abord dans l'URL
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // S'il n'y a rien, c'est que je veux afficher mon profil
      id = this.auth.getUserDetails().user;
    }

    // Récupération des données du profil
    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
    }, (err) => {
      console.error(err);
    });

    // Récupération des missions
    this.missionService.getMissionByUser(id).subscribe((data: Mission[])=> {
      this.missions = data;
    },(err) => {
      console.log(err);
    });
  }

  // Modification des données générales
  openEditMainDialog(): void {
    const editMainDialogRef = this.dialog.open(EditMainDialogComponent, {
      id: 'update-main-dialog',
      data: this.user,
      ariaLabel: 'main-dialog',
    });

    editMainDialogRef.afterClosed().subscribe(result => {
      this.fetchProfile();
    });
  }

  // Modification des coordonnées
  openEditContactDialog(): void {
    const editContactDialogRef = this.dialog.open(EditContactDialogComponent, {
      id: 'update-contact-dialog',
      data: this.user,
      ariaLabel: 'contact-dialog',
    });

    editContactDialogRef.afterClosed().subscribe(result => {
      this.fetchProfile();
    });
  }

  // Ajout d'une mission
  openAddMissionDialog(){
    const addMissionDialogRef = this.dialog.open(AddMissionDialogComponent, {
      id: 'add-mission-dialog',
      data: this.user,
      ariaLabel: 'add-mission-dialog',
    });

    addMissionDialogRef.afterClosed().subscribe(result => {
      this.fetchProfile();
    });
  }

  // Suppression d'une mission
  openDeleteMissionDialog(mission){
    const deleteMissionDialogRef = this.dialog.open(DeleteMissionDialogComponent, {
      id: 'delete-mission-dialog',
      data: mission,
      ariaLabel: 'delete-mission-dialog',
    });

    deleteMissionDialogRef.afterClosed().subscribe(result => {
      this.fetchProfile();
    });
  }

  // Utiles
  openLinkInNewTab(page) {
    window.open('http://' + page, '_newtab');
  }

  getInitiales(user) {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }

  canEdit() {
    if (this.user && this.user._id) {
      return this.auth.getUserDetails().user === this.user._id;
    }
  }
}
