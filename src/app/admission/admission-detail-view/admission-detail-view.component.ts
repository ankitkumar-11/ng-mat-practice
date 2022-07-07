import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GENDER } from 'src/app/shared/constants/constants';
import { AdmissionDetail } from '../model/admission-details.model';

@Component({
  selector: 'app-admission-detail-view',
  templateUrl: './admission-detail-view.component.html',
  styleUrls: ['./admission-detail-view.component.scss']
})
export class AdmissionDetailViewComponent implements OnInit {

  public GENDER = GENDER;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: AdmissionDetail) {}

  ngOnInit(): void {
  }
}
