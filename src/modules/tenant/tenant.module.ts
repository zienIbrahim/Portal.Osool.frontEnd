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
    declarations: [...tenantContainers.containers, ...tenantComponents.components],
    exports: [...tenantContainers.containers, ...tenantComponents.components],
})
export class TenantModule {}
