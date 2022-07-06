import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AdmissionFormPresenterService {

  constructor(private _fb: FormBuilder) { }

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
      subjects: this._fb.array([], [Validators.maxLength(5), Validators.required])
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
}
