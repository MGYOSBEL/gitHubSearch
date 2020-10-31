import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailModule } from '../user-detail/user-detail.module';


@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    UserDetailModule,
    UsersListRoutingModule
  ],
  exports: [
    UsersListComponent
  ]
})
export class UsersListModule { }
