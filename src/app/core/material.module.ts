import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import {
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatChipsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatExpansionModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatSnackBarModule,
        MatChipsModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatExpansionModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatSnackBarModule,
        MatChipsModule
    ],
})
export class MaterialModule { }
