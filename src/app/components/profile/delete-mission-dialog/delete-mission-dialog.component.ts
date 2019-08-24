import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Mission } from 'src/app/models/Mission.model';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-delete-mission-dialog',
  templateUrl: './delete-mission-dialog.component.html',
  styleUrls: ['./delete-mission-dialog.component.scss']
})
export class DeleteMissionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: Mission,
    public missionService: MissionService) { }

  ngOnInit() {

  }

  deleteMission(): void{
    this.missionService.delete(this.mission._id).subscribe((data) => {
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
