import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDialogRoutingModule } from './users-dialog-routing.module';
import { UsersDialogComponent } from './users-dialog.component';
import { UsersListPresentationComponent } from './users-list-presentation/users-list-presentation.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';
import { UserFormPresentationComponent } from './users-list-presentation/user-form-presentation/user-form-presentation.component';


@NgModule({
  declarations: [
    UsersDialogComponent,
    UsersListPresentationComponent,
    UserFormPresentationComponent
  ],
  imports: [
    CommonModule,
    UsersDialogRoutingModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UsersDialogModule { }
