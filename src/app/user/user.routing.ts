import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../security/authGaurd.component';

import { WelcomeComponent } from './welcome.component';
import { UserHomeComponent } from './userHome/userHome.component';
import { UserProfileComponent } from './profile/profile.component'; 

const userRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserHomeComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}