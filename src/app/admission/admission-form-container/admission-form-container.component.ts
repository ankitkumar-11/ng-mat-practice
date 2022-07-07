import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { AdmissionService } from '../admission.service';
import { AdmissionDetail } from '../model/admission-details.model';
import { PostalDetail } from '../model/postal-details.model';
@Component({
  selector: 'app-admission-form-container',
  templateUrl: './admission-form-container.component.html',
  styleUrls: ['./admission-form-container.component.scss']
})
export class AdmissionFormContainerComponent implements OnInit {

  private citys: string[]
  private _postalDetail: Subject<PostalDetail>
  public postalDetail$: Observable<PostalDetail>;

  constructor(private _service: AdmissionService, private _utilities: UtilitiesService) {
    this.citys = [];
    this._postalDetail = new Subject<PostalDetail>();
    this.postalDetail$ = this._postalDetail.asObservable();
  }

  ngOnInit(): void {

  }

  /**
   * @name onPinCode
   * @description get state, country and array of city and emit to postal details subject
   * @param pincode 
   */
  public onPinCode(pincode: number) {
    this._service.getPostalAddress(pincode).subscribe((res: any) => {
      if (res == null) {
        this._utilities.showSnackBar("Invalid Pin Code.")
      }
      else {
        this.citys = [];
        res.forEach((el: any) => {
          this.citys.push(el.Name)
        })
        this._postalDetail.next({ citys: this.citys, country: res[0].Country, state: res[0].State })
      }
    })
  }

  /**
   * @name onSubmit
   * @description add new Admission data
   * @param data:AdmissionDetail
   */
  public onSubmit(data: AdmissionDetail) {
    this._service.addNewAdmission(data).subscribe(() => {
      this._utilities.showSnackBar("Admission is done Successfully.")
    })
  }

}
