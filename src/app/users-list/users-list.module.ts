import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [UsersListComponent, UserCardComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule
  ],
  exports: [
    UsersListComponent
  ]
})
export class UsersListModule { }
