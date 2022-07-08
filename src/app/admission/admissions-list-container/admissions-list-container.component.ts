import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
//-----------------------------------------------------------------------------------s
import { AdmissionDetail } from '../model/admission-details.model';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
//-----------------------------------------------------------------------------------
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-admissions-list-container',
  templateUrl: './admissions-list-container.component.html',
  styleUrls: ['./admissions-list-container.component.scss']
})
export class AdmissionsListContainerComponent implements OnInit {

  public admissionList$: Observable<AdmissionDetail[]>

  constructor(private _admissionService: AdmissionService, private _utitlity: UtilitiesService) {
    this.admissionList$ = new Observable<AdmissionDetail[]>();
  }

  ngOnInit(): void {
    this.getAdmissionList()
  }

  /**
   * @name getAdmissionList
   * @description get list of all admission as observable
   */
  public getAdmissionList(): void {
    this.admissionList$ = this._admissionService.getAllAdmissions();
  }

  /**
   * @name updateAdmission
   * @description update the admission data
   * @param data :AdmissionDetail
   */
  public updateAdmission(data: AdmissionDetail): void {
    if (data.id) {
      this._admissionService.updateAdmission(data, data.id).subscribe(() => {
        this._utitlity.showSnackBar("Admission Details Updated Successfully.");
        this.admissionList$ = this._admissionService.getAllAdmissions();
      })
    }
  }

  /**
   * @name onDelete
   * @description show the confirmation dialog
   * @param data : AdmissionDetail
   */
  public onDelete(data: AdmissionDetail): void {
    const mgs = `Are you sure you want to Delete ${data.fullName}?`;
    this._utitlity.openDeleteConfirmation(mgs).afterClosed().subscribe({
      next: (result) => {
        if (result && data.id) {
          this.removeAdmission(data.id)
        }
      },
      error: (e) => {
        console.error(e)
      }
    })

  }

  /**
   * @name removeAdmission
   * @description remove admission data
   * @param id : string
   */
  private removeAdmission(id: string): void {
    this._admissionService.removeAdmissions(id).subscribe({
      next: () => {
        this._utitlity.showSnackBar("User is Removed");
        this.getAdmissionList();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}
