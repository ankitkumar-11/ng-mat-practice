import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionFormContainerComponent } from './admission-form-container/admission-form-container.component';
import { AdmissionsListContainerComponent } from './admissions-list-container/admissions-list-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admissionForm',
  },
  {
    path: 'admissionForm',
    component: AdmissionFormContainerComponent,
  },
  {
    path: 'admissionList',
    component: AdmissionsListContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
