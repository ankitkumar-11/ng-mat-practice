import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//------------------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
//------------------------------------------------------------------------------------
import { BLOOD_GROUP_REGEX, EMAIL_REGEX, ONLY_ALPHABETS_REGEX, PHONE_NO_REGEX, PINCODE_REGEX } from 'src/app/shared/constants/constants';
//------------------------------------------------------------------------------------
import { AdmissionUtilitiesService } from '../../admission-utilities.service';
//------------------------------------------------------------------------------------
import { AdmissionDetail } from '../../model/admission-details.model';

@Injectable()
export class AdmissionFormPresenterService {

  private onSubmit: Subject<AdmissionDetail>;
  private onSubmit$: Observable<AdmissionDetail>

  constructor(private _fb: FormBuilder, private _admissionUtilities: AdmissionUtilitiesService) {
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
      fullName: [null, [Validators.required, Validators.maxLength(40), Validators.pattern(ONLY_ALPHABETS_REGEX)]],
      email: [null, [Validators.required, Validators.maxLength(40), Validators.pattern(EMAIL_REGEX)]],
      phoneNo: [null, [Validators.required, Validators.pattern(PHONE_NO_REGEX)]],
      dateOfBirth: [null, [Validators.required]],
      gender: ['0', [Validators.required]],
      bloodGroup: [null, [Validators.required, Validators.pattern(BLOOD_GROUP_REGEX)]],
      branch: [null, [Validators.required, Validators.maxLength(10)]],
      pinCode: [null, [Validators.required, Validators.pattern(PINCODE_REGEX)]],
      country: [{ value: null, disabled: true }, [Validators.required]],
      state: [{ value: null, disabled: true }, [Validators.required]],
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
    this._admissionUtilities.openAdmissionDetailView(data, 'form').afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.onSubmit.next(data)
      }
    })
    return this.onSubmit$;
  }
}
