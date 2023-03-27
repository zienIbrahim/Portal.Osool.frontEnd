/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



/* Module */
import { TenantModule } from './tenant.module';

/* Containers */
import * as tenantContainers from './containers';
import * as tenantComponent from './components';


/* Guards */
import * as tenantGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: tenantContainers.TenantComponent,
    // },
    {
        path: '',
        canActivate : [],
        component:tenantContainers.TenantLayoutComponent ,
        children: [
            {
                
                path: 'List',
                component: tenantComponent.TenantTenantListComponent,
                
            },
             {
                
                path: 'GroupType',
                component: tenantComponent.TenantGroupTypeListComponent,
                
            }
          
           
        ],
    }
];

@NgModule({
    imports: [TenantModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TenantRoutingModule {}
