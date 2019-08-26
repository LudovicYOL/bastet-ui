import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-edit-main-dialog',
  templateUrl: './edit-main-dialog.component.html',
  styleUrls: ['./edit-main-dialog.component.scss']
})
export class EditMainDialogComponent implements OnInit {

  // Séparateur pour la saisie des mots clés
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Liste des promotions pour la liste déroulante
  promotions = [];

  constructor(public dialogRef: MatDialogRef<EditMainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generatePromotions();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  /**
   * Modification du profil utilisateur avec les nouvelles données générales
   */
  update(): void {
    if (this.user.firstName !== '' &&
      this.user.lastName !== '' &&
      this.user.promotion !== '') {
      this.userService.update(this.user).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'FERMER', {
        duration: 3000,
      });
    }
  }

  /**
   * Génération de la liste des promotions disponibles
   */
  generatePromotions() {
    let year = 2009;
    const actualYear = new Date().getFullYear();
    while (year <= actualYear + 5) {
      this.promotions.push(year);
      year++;
    }
  }

  // Gestion des mots clés
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our keyword if it is valid and is not in the existing list
    if ((value || '').trim() && (this.user.keywords.indexOf(value) === -1)) {
      this.user.keywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // Suppression d'un mot clé
  remove(keyword: string): void {
    const index = this.user.keywords.indexOf(keyword);

    if (index >= 0) {
      this.user.keywords.splice(index, 1);
    }
  }

}
