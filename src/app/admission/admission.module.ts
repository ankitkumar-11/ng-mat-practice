import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionFormContainerComponent } from './admission-form-container/admission-form-container.component';
import { AdmissionFormPresentationComponent } from './admission-form-container/admission-form-presentation/admission-form-presentation.component';
import { SharedModule } from '../shared/shared.module';
import { AdmissionService } from './admission.service';
import { AdmissionsListContainerComponent } from './admissions-list-container/admissions-list-container.component';
import { AdmissionDetailViewComponent } from './admission-detail-view/admission-detail-view.component';


@NgModule({
  declarations: [
    AdmissionFormContainerComponent,
    AdmissionFormPresentationComponent,
    AdmissionsListContainerComponent,
    AdmissionDetailViewComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    SharedModule
  ],
  providers: [AdmissionService]
})
export class AdmissionModule { }
