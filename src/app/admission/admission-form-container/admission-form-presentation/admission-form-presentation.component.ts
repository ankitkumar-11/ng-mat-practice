import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
//----------------------------------------------------------------------
import { AdmissionDetail } from '../../model/admission-details.model';
import { PostalDetail } from '../../model/postal-details.model';
//----------------------------------------------------------------------
import { AdmissionFormPresenterService } from '../admission-form-presenter/admission-form-presenter.service';

@Component({
  selector: 'app-admission-form-presentation',
  templateUrl: './admission-form-presentation.component.html',
  styleUrls: ['./admission-form-presentation.component.scss'],
  viewProviders: [AdmissionFormPresenterService]
})
export class AdmissionFormPresentationComponent implements OnInit {

  /**
   * Setter method of edit Data
   */
  @Input() public set editData(v: AdmissionDetail) {
    if (v) {
      this._editData = v;
      this.isEditMode = true;
      this.admissionForm.patchValue(this._editData);
      this.pinCode.emit(this.editData.pinCode);
      this.subjects.clear()
      this._editData.subjects.forEach(el => {
        this.subjects.push(this._presenter.subjectField(el));
      })
    }
  }
  public get editData(): AdmissionDetail {
    return this._editData;
  }

  /**
   * Setter method of Postal Deatails (citys:string[], state, country)
   */
  @Input() public set postalDetails(v: PostalDetail | null) {
    if (v) {
      this._postalDetails = v;
      this.admissionForm.get('state')?.setValue(this.postalDetails.state);
      this.admissionForm.get('country')?.setValue(this.postalDetails.country);
    }
  }
  public get postalDetails(): PostalDetail {
    return this._postalDetails;
  }

  @Output() pinCode: EventEmitter<number>
  @Output() onSubmit: EventEmitter<AdmissionDetail>

  public admissionForm!: FormGroup;
  public isEditMode: boolean;
  public todaysDate: Date;
  public maxDate: Date;

  private _postalDetails!: PostalDetail;

  private _editData!: AdmissionDetail;

  constructor(private _presenter: AdmissionFormPresenterService) {
    this.admissionForm = this._presenter.admissionForm();
    this.pinCode = new EventEmitter<number>();
    this.onSubmit = new EventEmitter<AdmissionDetail>();
    this._postalDetails = { citys: [], country: '', state: '' };
    this.isEditMode = false;
    this.todaysDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setUTCFullYear(this.todaysDate.getFullYear() - 5)
  }

  ngOnInit(): void {
  }

  /**
   * @name getControls
   * @description It is a getter function to get form controls
   */
  public get getControls() {
    return this.admissionForm['controls'];
  }

  /**
  * @name subjects
  * @description It is a getter function to get subject form array
  */
  public get subjects(): FormArray {
    return this.getControls['subjects'] as FormArray;
  }

  /**
   * @name onPinCodeChange
   * @description emit pin code to container if valid 
   */
  public onPinCodeChange(): void {
    this.resetPostalDetail();
    if (this.admissionForm.get('pinCode')?.valid) {
      debugger
      this.pinCode.emit(parseInt(this.admissionForm.get('pinCode')?.value))
    }
  }

  /**
   * @name addSubjectField
   * @description push new Subject field to subject form array (Max 5) 
   */
  public addSubjectField(): void {
    if (this.subjects.length < 5)
      this.subjects.push(this._presenter.subjectField())
  }

  /**
   * @name removeSubjectField
   * @description remove Subject field from subject form array from particular index except 0th index
   * @param index:number
   */
  public removeSubjectField(index: number): void {
    if (index !== 0) {
      this.subjects.removeAt(index)
    }
  }

  /**
   * @name openView
   * @description open admission view detail in form is valid
   */
  public openView() {
    this.admissionForm.valid ? this._presenter.openView(this.admissionForm.getRawValue()).subscribe({
      next: (data) => {
        this.onSubmit.emit(data);
      },
      error: (e) => {
        console.log(e);
      }
    }) : this.admissionForm.markAllAsTouched();
  }

  /**
  * @name resetForm
  * @description reset the form group
  */
  public resetForm() {
    this.admissionForm.reset();
  }

  /**
   * @name resetPostalDetail
   * @description Reset the postal detail object
   */
  private resetPostalDetail() {
    this._postalDetails.citys = [];
    this._postalDetails.country = '';
    this.postalDetails.state = '';
  }

}
