import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './error404.component';

const errorRoutes: Routes = [
    {
        path: '**',
        component: Error404Component
    }
]

@NgModule(
    {
        imports: [
            RouterModule.forRoot(
                errorRoutes
            )
        ],
        exports: [
            RouterModule
        ],
        providers:[

        ]
    }
)
export class ErrorRoutes{

}
