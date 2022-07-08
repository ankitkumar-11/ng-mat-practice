import { Component, Input, OnInit } from '@angular/core';
import { GENDER } from 'src/app/shared/constants/constants';
import { AdmissionDetail } from '../model/admission-details.model';

@Component({
  selector: 'app-admission-detail-view',
  templateUrl: './admission-detail-view.component.html',
  styleUrls: ['./admission-detail-view.component.scss']
})
export class AdmissionDetailViewComponent implements OnInit {


  private _viewType: string;
  public get viewType(): string {
    return this._viewType;
  }
  @Input() public set viewType(v: string) {
    this._viewType = v;
  }


  private _data !: AdmissionDetail;
  public get data(): AdmissionDetail {
    return this._data;
  }
  public set data(v: AdmissionDetail) {
    this._data = v;
  }


  public GENDER = GENDER;

  constructor() {
    this._viewType = 'form'
  }

  ngOnInit(): void {
  }
}
