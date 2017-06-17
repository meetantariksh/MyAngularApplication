import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoadUserComponent } from '../loadUser/loadUser.component';

import { AuthGuard } from '../security/authGaurd.component';

const applicationRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'load',
        component: LoadUserComponent,
        canLoad: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: 'app/user/user.module#UserModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'userSetup',
        loadChildren: 'app/firstLogin/firstLogin.module#FirstLoginModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'aboutUs',
        loadChildren: 'app/sharedModule/shared.module#SharedModule',
    },
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule(
    {
        imports: [
            RouterModule.forRoot(
                applicationRoutes
            )
        ],
        exports: [
            RouterModule
        ],
        providers:[

        ]
    }
)
export class ApplicationRoutes{

}
