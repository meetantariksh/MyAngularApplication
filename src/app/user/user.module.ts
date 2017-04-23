import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { WelcomeComponent } from './welcome.component';
import { UserSideBar } from './sidebar/sidebar.component';
import { UserHomeComponent } from './userHome/userHome.component';
import { UserProfileComponent } from './profile/profile.component'; 

import { UserRoutingModule }       from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    WelcomeComponent,
    UserSideBar,
    UserHomeComponent,
    UserProfileComponent
  ]
})
export class UserModule {}