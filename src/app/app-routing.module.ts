import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list/users-list.component';


const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: ':username',
        loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule)
      },
      {
        path: '',
        component: UsersListComponent,
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
