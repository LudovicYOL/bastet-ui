import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-main-dialog',
  templateUrl: './edit-main-dialog.component.html',
  styleUrls: ['./edit-main-dialog.component.scss']
})
export class EditMainDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditMainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.userService.update(this.user).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
