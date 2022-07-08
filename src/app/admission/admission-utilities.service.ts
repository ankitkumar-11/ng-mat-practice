import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//-----------------------------------------------------------------------------
import { AdmissionDetailViewComponent } from './admission-detail-view/admission-detail-view.component';
import { AdmissionFormContainerComponent } from './admission-form-container/admission-form-container.component';
//-----------------------------------------------------------------------------
import { AdmissionDetail } from './model/admission-details.model';

@Injectable()
export class AdmissionUtilitiesService {

  constructor(private _dialog: MatDialog) { }

  /**
   * @name openAdmissionDetailView
   * @description open Admission Detail View Component
   * @param data : AdmissionDetail
   * @param viewType : 'form' | 'list'
   * @returns MatDialogRef<AdmissionDetailViewComponent>
   */
  public openAdmissionDetailView(data: AdmissionDetail, viewType: 'form' | 'list'): MatDialogRef<AdmissionDetailViewComponent> {
    const dialogRef = this._dialog.open(AdmissionDetailViewComponent, { width: '60%' });
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.viewType = viewType;
    return dialogRef;
  }

  /**
   * @name openEditForm
   * @description open form in edit mode
   * @param data AdmissionDetail
   * @returns MatDialogRef<AdmissionFormContainerComponent>
   */
  public openEditForm(data: AdmissionDetail): MatDialogRef<AdmissionFormContainerComponent> {
    const dialogRef = this._dialog.open(AdmissionFormContainerComponent, { width: '80%' });
    dialogRef.componentInstance.editData = data;
    return dialogRef;
  }
}
