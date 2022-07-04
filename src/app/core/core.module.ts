import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { MasterComponent } from './components/master/master.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MasterComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
