/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { MainLayoutModule } from '../main-layout/main-layout.module';

/* Components */
import * as tenantComponents from './components';

/* Containers */
import * as tenantContainers from './containers';

/* Guards */
import * as tenantGuards from './guards';

/* Services */
import * as tenantServices from './services';
import { TenantGroupTypeListComponent } from './components/TenantGroupType/tenant-group-type-list/tenant-group-type-list.component';
import { AddTenantGroupTypeComponent } from './components/TenantGroupType/add-tenant-group-type/add-tenant-group-type.component';
import { EditTenantGroupTypeComponent } from './components/TenantGroupType/edit-tenant-group-type/edit-tenant-group-type.component';
import { CreateTenantComponent } from './components/Tenant/create-tenant/create-tenant.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        MainLayoutModule,
    ],
    providers: [...tenantServices.services, ...tenantGuards.guards],
    declarations: [...tenantContainers.containers, ...tenantComponents.components, CreateTenantComponent],
    exports: [...tenantContainers.containers, ...tenantComponents.components],
})
export class TenantModule {}
