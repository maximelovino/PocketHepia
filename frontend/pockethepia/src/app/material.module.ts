import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
