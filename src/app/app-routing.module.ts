import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './core/components/master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'users'
      },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
