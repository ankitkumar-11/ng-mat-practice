import { Injectable } from '@angular/core';
//-----------------------------------------------------------------------------
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
//-----------------------------------------------------------------------------
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
//-----------------------------------------------------------------------------
import { DialogData } from '../models/dialogData.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

  /**
   * @name showSnackBar
   * @description show snack bar 
   * @param message:string 
   * @param action:string (default empty string)
   * @param config:MatSnackBarConfig (default duration: 1s position top-right)
   */
  public showSnackBar(
    message: string,
    action: string = "",
    config: MatSnackBarConfig<any> = {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }): void {

    this._snackBar.open(message, action, config)

  }

  /**
   * @name openDeleteConfirmation
   * @description open confirmation dialog 
   * @param message :string
   * @param title : string (optional)
   * @returns MatDialogRef<ConfirmationDialogComponent>
   */
  public openDeleteConfirmation(message: string, title?: string): MatDialogRef<ConfirmationDialogComponent> {
    let dataObj: DialogData;

    title ? dataObj = { title: title, message: message }
      : dataObj = { message: message }

    return this._dialog.open(ConfirmationDialogComponent, {
      panelClass: 'dialog-container-custom',
      data: dataObj
    })
  }
}
