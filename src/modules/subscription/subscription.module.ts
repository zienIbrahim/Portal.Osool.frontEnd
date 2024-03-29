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
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AddOrderComponent } from './components/Order/add-order/add-order.component';
import { OrderListComponent } from './components/Order/order-list/order-list.component';
import { EditOrderComponent } from './components/Order/edit-order/edit-order.component';
import { OrderCkeckoutComponent } from './components/Order/order-ckeckout/order-ckeckout.component';
import { UpgreadOrderComponent } from './components/Order/upgread-order/upgread-order.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    MainLayoutModule,
  ],
  providers: [
    ...subscriptionServices.services,
    ...subscriptionGuards.guards,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  declarations: [
    ...subscriptionContainers.containers,
    ...subscriptionComponents.components,
    UpgreadOrderComponent,
  ],
  exports: [
    ...subscriptionContainers.containers,
    ...subscriptionComponents.components,
  ],
})
export class SubscriptionModule {}
