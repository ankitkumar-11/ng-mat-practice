import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.modal';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.scss'],
  viewProviders: [UserFormPresenterService]
})
export class UserFormPresentationComponent implements OnInit {


  private _editUserData!: User;
  public get editUserData(): User | any {
    return this._editUserData;
  }
  @Input() public set editUserData(v: User | null) {
    if (v) {
      this._editUserData = v;
      this.userForm.patchValue(this._editUserData)
      this._editUserData.skills.forEach(skill => {
        this.skills.push(this._presenter.skillField(skill))
      })
    }
  }

  @Output() submit: EventEmitter<User>;
  @Output() cancel: EventEmitter<Event>;

  public userForm: FormGroup;
  public formSubmitted: boolean

  constructor(private _presenter: UserFormPresenterService) {
    this.userForm = this._presenter.userForm();
    this.submit = new EventEmitter<User>();
    this.cancel = new EventEmitter<Event>();
    this.formSubmitted = false;
  }

  ngOnInit(): void {
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
    this.userForm.valid ? this.submit.emit(this.userForm.value) : this.userForm.markAllAsTouched();
  }


  /**
   * @name onCancel
   * @description redirect to list on cancel
   */
  public onCancel(): void {
    this.cancel.emit()
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
