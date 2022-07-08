import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//-------------------------------------------------------------------------------------
import { AdmissionRoutingModule } from './admission-routing.module';
//-------------------------------------------------------------------------------------
import { AdmissionFormContainerComponent } from './admission-form-container/admission-form-container.component';
import { AdmissionFormPresentationComponent } from './admission-form-container/admission-form-presentation/admission-form-presentation.component';
import { AdmissionsListContainerComponent } from './admissions-list-container/admissions-list-container.component';
import { AdmissionDetailViewComponent } from './admission-detail-view/admission-detail-view.component';
import { AdmissionListPresentationComponent } from './admissions-list-container/admission-list-presentation/admission-list-presentation.component';
//-------------------------------------------------------------------------------------
import { SharedModule } from '../shared/shared.module';
//-------------------------------------------------------------------------------------
import { AdmissionUtilitiesService } from './admission-utilities.service';
import { AdmissionService } from './admission.service';

@NgModule({
  declarations: [
    AdmissionFormContainerComponent,
    AdmissionFormPresentationComponent,
    AdmissionsListContainerComponent,
    AdmissionDetailViewComponent,
    AdmissionListPresentationComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    SharedModule
  ],
  providers: [AdmissionService, AdmissionUtilitiesService]
})
export class AdmissionModule { }
