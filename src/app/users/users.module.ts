import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import { UserListPresenationComponent } from './user-list-container/user-list-presenation/user-list-presenation.component';
import { MaterialModule } from '../material/material.module';
import { UserFormContainerComponent } from './user-form-container/user-form-container.component';
import { UserFormPresentationComponent } from './user-form-container/user-form-presentation/user-form-presentation.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    UserListContainerComponent,
    UserListPresenationComponent,
    UserFormContainerComponent,
    UserFormPresentationComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers:[
    UserService
  ]
})
export class UsersModule { }
