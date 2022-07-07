import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from '../material/material.module';
import { OnlyAlphabetsDirective } from './directives/only-alphabets.directive';
import { ToUpperCaseDirective } from './directives/to-upper-case.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    OnlyAlphabetsDirective,
    ToUpperCaseDirective,
    OnlyNumbersDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ConfirmationDialogComponent,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
    ToUpperCaseDirective,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
