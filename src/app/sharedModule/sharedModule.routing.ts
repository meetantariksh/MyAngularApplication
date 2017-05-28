import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { SharedComponent } from './shared.component';

const sharedRoutes: Routes = [
    {
        path: '',
        component: SharedComponent,
        children: [
                    {
                        path: '',
                        component: AboutUsComponent,
                    },
                    {
                        path: 'whoAreWe',
                        component: AboutUsComponent,
                    }
        ]
    },
    
]

@NgModule(
    {
        imports: [
            RouterModule.forChild(
                sharedRoutes
            )
        ],
        exports: [
            RouterModule
        ]
    }
)
export class SharedRoutes{

}
