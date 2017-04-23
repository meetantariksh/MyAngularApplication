import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';

import { AuthGuard } from '../security/authGaurd.component';

const applicationRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
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
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
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
