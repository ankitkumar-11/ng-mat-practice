import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../models/dialogData.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

  public showSnackBar(
    message: string,
    action: string = "",
    config: MatSnackBarConfig<any> = {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }) {
    this._snackBar.open(message, action, config)
  }


  public openDeleteConfirmation(message: string, title?: string): MatDialogRef<ConfirmationDialogComponent> {
    let dataObj: DialogData;
    title ? dataObj = {
      title: title,
      message: message
    } : dataObj = {
      message: message,
    }
    return this._dialog.open(ConfirmationDialogComponent, {
      panelClass: 'dialog-container-custom',
      data: dataObj
    })
  }
}
