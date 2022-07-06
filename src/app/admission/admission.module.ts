import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionFormContainerComponent } from './admission-form-container/admission-form-container.component';
import { AdmissionFormPresentationComponent } from './admission-form-container/admission-form-presentation/admission-form-presentation.component';
import { SharedModule } from '../shared/shared.module';
import { AdmissionService } from './admission.service';


@NgModule({
  declarations: [
    AdmissionFormContainerComponent,
    AdmissionFormPresentationComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    SharedModule
  ],
  providers: [AdmissionService]
})
export class AdmissionModule { }
