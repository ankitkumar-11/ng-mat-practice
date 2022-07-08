import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
//---------------------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
//---------------------------------------------------------------------------------------
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { UserFormPresentationComponent } from 'src/app/users/user-form-container/user-form-presentation/user-form-presentation.component';
import { AdmissionUtilitiesService } from '../admission-utilities.service';
import { AdmissionService } from '../admission.service';
//---------------------------------------------------------------------------------------
import { AdmissionDetail } from '../model/admission-details.model';
import { PostalDetail } from '../model/postal-details.model';
@Component({
  selector: 'app-admission-form-container',
  templateUrl: './admission-form-container.component.html',
  styleUrls: ['./admission-form-container.component.scss']
})
export class AdmissionFormContainerComponent implements OnInit {

  public get editData(): AdmissionDetail {
    return this._editData;
  }
  @Input() public set editData(v: AdmissionDetail) {
    this._editData = v;
  }

  @Output() public editedData: EventEmitter<AdmissionDetail>;

  private _citys: string[]
  private _editData!: AdmissionDetail;
  private _postalDetail: Subject<PostalDetail>
  public postalDetail$: Observable<PostalDetail>;

  constructor(private _service: AdmissionService, private _utilities: UtilitiesService) {
    this._citys = [];
    this._postalDetail = new Subject<PostalDetail>();
    this.postalDetail$ = this._postalDetail.asObservable();
    this.editedData = new EventEmitter<AdmissionDetail>();
  }

  ngOnInit(): void { }

  /**
   * @name onPinCode
   * @description get state, country and array of city and emit to postal details subject
   * @param pincode 
   */
  public onPinCode(pincode: number) {
    debugger
    this._service.getPostalAddress(pincode).subscribe((res: any) => {
      if (res == null) {
        this._utilities.showSnackBar("Invalid Pin Code.")
      }
      else {
        this._citys = [];
        res.forEach((el: any) => {
          this._citys.push(el.Name)
        })
        this._postalDetail.next({ citys: this._citys, country: res[0].Country, state: res[0].State })
      }
    })
  }

  /**
   * @name onSubmit
   * @description add new Admission data
   * @param data:AdmissionDetail
   */
  public onSubmit(data: AdmissionDetail) {
    this.editData ? this.updateAdmissionDetails(data) : this.addNewAdmission(data);
  }

  private addNewAdmission(data: AdmissionDetail) {
    this._service.addNewAdmission(data).subscribe(() => {
      this._utilities.showSnackBar("Admission is done Successfully.")
    })
  }

  private updateAdmissionDetails(data: AdmissionDetail) {
    data.id = this.editData.id;
    this.editedData.emit(data)
  }

}
