import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDialogComponent } from './users-dialog.component';

const routes: Routes = [{ path: '', component: UsersDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersDialogRoutingModule { }
