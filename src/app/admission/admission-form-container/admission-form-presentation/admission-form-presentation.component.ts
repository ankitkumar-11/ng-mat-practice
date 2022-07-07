import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AdmissionDetail } from '../../model/admission-details.model';
import { PostalDetail } from '../../model/postal-details.model';
import { AdmissionFormPresenterService } from '../admission-form-presenter/admission-form-presenter.service';

@Component({
  selector: 'app-admission-form-presentation',
  templateUrl: './admission-form-presentation.component.html',
  styleUrls: ['./admission-form-presentation.component.scss'],
  viewProviders: [AdmissionFormPresenterService]
})
export class AdmissionFormPresentationComponent implements OnInit {

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

  private _postalDetails!: PostalDetail;

  constructor(private _presenter: AdmissionFormPresenterService) {
    this.pinCode = new EventEmitter<number>();
    this.onSubmit = new EventEmitter<AdmissionDetail>();
  }

  ngOnInit(): void {
    this.admissionForm = this._presenter.admissionForm();
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
    if (this.admissionForm.get('pinCode')?.valid) {
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
        this.onSubmit.emit(data)
      },
      error: (e) => {
        console.log(e);
      }
    }) : this.admissionForm.markAllAsTouched();
  }

}
