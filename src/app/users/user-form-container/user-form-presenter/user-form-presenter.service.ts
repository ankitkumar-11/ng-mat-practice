import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class UserFormPresenterService {

  constructor(private _fb: FormBuilder) { }

  public userForm(): FormGroup {
    return this._fb.group({
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNo: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      gender: ['0', [Validators.required]],
      bloodGroup: [null, [Validators.pattern(/^(A|B|AB|O)[+|-]$/i)]],
      address: [null, [Validators.required]],
      skills: this._fb.array([], [Validators.minLength(2), Validators.required])
    })
  }

  //skills form group
  public skillField(): FormControl {
    return this._fb.control(null, [Validators.required]);
  }
}
