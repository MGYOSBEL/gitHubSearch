import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';


const userDetailRoutes: Routes = [
  {
    path: '',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userDetailRoutes)],
  exports: [RouterModule]
})
export class UserDetailRoutingModule { }
