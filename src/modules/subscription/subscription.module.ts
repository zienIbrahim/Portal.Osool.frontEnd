/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { MainLayoutModule } from '../main-layout/main-layout.module';

/* Components */
import * as subscriptionComponents from './components';

/* Containers */
import * as subscriptionContainers from './containers';

/* Guards */
import * as subscriptionGuards from './guards';

/* Services */
import * as subscriptionServices from './services';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        MainLayoutModule,
    ],
    providers: [...subscriptionServices.services, ...subscriptionGuards.guards],
    declarations: [...subscriptionContainers.containers, ...subscriptionComponents.components ],
    exports: [...subscriptionContainers.containers, ...subscriptionComponents.components],
})
export class SubscriptionModule {}
