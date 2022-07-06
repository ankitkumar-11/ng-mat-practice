import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdmissionFormPresenterService } from '../admission-form-presenter/admission-form-presenter.service';

@Component({
  selector: 'app-admission-form-presentation',
  templateUrl: './admission-form-presentation.component.html',
  styleUrls: ['./admission-form-presentation.component.scss'],
  viewProviders: [AdmissionFormPresenterService]
})
export class AdmissionFormPresentationComponent implements OnInit {



  private _state : string ='';
  public get state(): string {
    return this._state;
  }
  @Input() public set state(v: string | null) {
    if (v)
      this._state = v;
  }


  private _country : string = '';
  public get country(): string {
    return this._country;
  }
  @Input() public set country(v: string | null) {
    if (v)
      this._country = v;
  }


  private _citys: any;
  public get citys(): any {
    return this._citys;
  }
  @Input() public set citys(v: any) {
    if (v) {
      this._citys = v;
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
