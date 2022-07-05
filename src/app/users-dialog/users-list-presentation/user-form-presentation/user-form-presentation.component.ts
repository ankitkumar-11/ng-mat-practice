import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/users/model/user.modal';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.scss'],
  viewProviders: [UserFormPresenterService]
})
export class UserFormPresentationComponent implements OnInit {


  public userForm: FormGroup;
  public formSubmitted: boolean

  constructor(@Inject(MAT_DIALOG_DATA) public _editUserData: User, private _presenter: UserFormPresenterService, private _dialogRef: MatDialogRef<UserFormPresentationComponent>) {
    this.userForm = this._presenter.userForm();
    this.formSubmitted = false;
  }

  ngOnInit(): void {
    if (this._editUserData) {
      this.userForm.patchValue(this._editUserData)
      this._editUserData.skills.forEach(skill => {
        this.skills.push(this._presenter.skillField(skill))
      })
    }
  }

  /**
   * @name getControls
   * @description It is a getter function to get form controls
   */
  public get getControls() {
    return this.userForm['controls'];
  }

  /**
   * @name skills
   * @description It is a getter function to get skills as form array from users form controls
   */
  public get skills(): FormArray {
    return this.userForm.controls["skills"] as FormArray;
  }

  /**
   * @name addSkillField
   * @description add new skill field in skills control array
   */
  public addSkillField(): void {
    if (this.skills.length < 5)
      this.skills.push(this._presenter.skillField())
  }

  /**
  * @name removeSkillField
  * @description remove skill field in skills control array
  */
  public removeSkillField(index: number): void {
    this.skills.removeAt(index)
  }

  /**
   * @name onSubmit
   * @description emit form value on submit click in form is valid
   */
  public onSubmit(): void {
    this.userForm.valid ? this._dialogRef.close(this.userForm.value) : this.userForm.markAllAsTouched();
  }


  /**
   * @name onCancel
   * @description close the form dialog box
   */
  public onCancel(): void {
    this._dialogRef.close();
  }


  /**
   * @name onReset
   * @description reset the form value
   */
  public onReset(): void {
    this.userForm.reset();
    this.userForm.get('gender')?.setValue('0');
  }
}
