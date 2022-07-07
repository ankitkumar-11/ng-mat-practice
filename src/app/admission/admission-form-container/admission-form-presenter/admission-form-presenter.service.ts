import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AdmissionDetailViewComponent } from '../../admission-detail-view/admission-detail-view.component';
import { AdmissionDetail } from '../../model/admission-details.model';

@Injectable()
export class AdmissionFormPresenterService {

  private onSubmit: Subject<AdmissionDetail>;
  private onSubmit$: Observable<AdmissionDetail>

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {
    this.onSubmit = new Subject<AdmissionDetail>();
    this.onSubmit$ = this.onSubmit.asObservable();
  }

  /**
   * @name admissionForm
   * @description admission form struture
   * @returns admissionForm : FormGroup 
   */
  public admissionForm(): FormGroup {
    return this._fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: [null, [Validators.required, Validators.maxLength(40), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phoneNo: [null, [Validators.required, Validators.pattern(/^([0-9]){10}$/)]],
      dateOfBirth: [null, [Validators.required]],
      gender: [0, [Validators.required]],
      bloodGroup: [null, [Validators.required, Validators.pattern(/^(A|B|AB|O)[+|-]$/i)]],
      branch: [null, [Validators.required, Validators.maxLength(10)]],
      pinCode: [null, [Validators.required, Validators.pattern(/^([0-9]){6}$/)]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.maxLength(200)]],
      subjects: this._fb.array([this.subjectField()], [Validators.maxLength(5), Validators.required])
    })
  }

  /**
   * @name subjectField
   * @description generate a subject Field form control 
   * @param value : string (optional) (default value is empty string)
   * @returns subjectField : FormControl
   */
  public subjectField(value: string = ''): FormControl {
    return this._fb.control(value, [Validators.required]);
  }

  /**
   * @nmae openView
   * @description open admission view detail and if submit emit the data 
   * @param data AdmissionDetail
   * @return Observable<AdmissionDetail>
   */
  public openView(data: AdmissionDetail): Observable<AdmissionDetail> {
    const admissionViewRef = this._dialog.open(AdmissionDetailViewComponent, {
      width: '60%',
      data: data
    })
    admissionViewRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.onSubmit.next(data)
      }
    })
    return this.onSubmit$;
  }
}
