import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MissionService } from 'src/app/services/mission.service';
import { User } from 'src/app/models/user.model';
import { Mission } from 'src/app/models/mission.model';

@Component({
  selector: 'app-add-mission-dialog',
  templateUrl: './add-mission-dialog.component.html',
  styleUrls: ['./add-mission-dialog.component.scss']
})
export class AddMissionDialogComponent implements OnInit {

  mission;
  domains = ["Technique", "Métier", "Qualité"];
  months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Décembre"];
  years = [];

  constructor(
    public dialogRef: MatDialogRef<AddMissionDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public user: User,
    public snackBar: MatSnackBar,
    public missionService: MissionService,
    ) { 
      this.mission = {};
    }

  ngOnInit() {
    this.generateYears();
  }

  addMission(): void{
    if (this.mission.poste && this.mission.poste !== '' &&
      this.mission.enterprise && this.mission.enterprise !== '' &&
      this.mission.domain && this.mission.domain !== '' &&
      this.mission.startMonth && this.mission.startMonth !== '' &&
      this.mission.startYear){
      this.missionService.addToUser(this.mission, this.user).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'FERMER', {
        duration: 3000,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  generateYears() {
    let year = 2011;
    const actualYear = new Date().getFullYear();
    while (year <= actualYear + 1) {
      this.years.push(year);
      year++;
    }
  }
}
