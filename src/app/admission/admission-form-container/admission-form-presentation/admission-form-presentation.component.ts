import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdmissionFormPresenterService } from '../admission-form-presenter/admission-form-presenter.service';

interface Post{
  citys:string[],
  country:string,
  state:string;
}
@Component({
  selector: 'app-admission-form-presentation',
  templateUrl: './admission-form-presentation.component.html',
  styleUrls: ['./admission-form-presentation.component.scss'],
  viewProviders: [AdmissionFormPresenterService]
})
export class AdmissionFormPresentationComponent implements OnInit {

  private _postalDetails!: Post;
  public get postalDetails(): Post {
    return this._postalDetails;
  }
  @Input() public set postalDetails(v: Post | null) {
    if (v) {
      this._postalDetails = v;
    }
  }

  public admissionForm!: FormGroup;
  @Output() pinCode: EventEmitter<number>
  constructor(private _presenter: AdmissionFormPresenterService) {
    this.pinCode = new EventEmitter<number>()
  }

  ngOnInit(): void {
    this.admissionForm = this._presenter.admissionForm();
    console.log(this.getControls)
  }

  get getControls() {
    return this.admissionForm['controls']
  }

  public onPinCodeChange() {
    if (this.admissionForm.get('pinCode')?.valid) {
      this.pinCode.emit(parseInt(this.admissionForm.get('pinCode')?.value))
    }
  }

}
