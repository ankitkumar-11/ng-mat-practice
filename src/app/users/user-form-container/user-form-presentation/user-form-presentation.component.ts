import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { User } from '../../model/user.modal';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.scss'],
  viewProviders: [UserFormPresenterService]
})
export class UserFormPresentationComponent implements OnInit {

  @Output() userData: EventEmitter<User>;

  public userForm: FormGroup;
  public formSubmitted: boolean

  constructor(private _presenter: UserFormPresenterService) {
    this.userForm = this._presenter.userForm();
    this.userData = new EventEmitter<User>;
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

  public onSubmit() {
    this.userForm.valid ? this.userData.emit(this.userForm.value) : this.userForm.markAllAsTouched();
  }



}
