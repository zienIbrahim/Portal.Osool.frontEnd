/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { SubscriptionModule } from './subscription.module';

/* Containers */
import * as subscriptionContainers from './containers';

/* Containers */
import * as subscriptionComponent from './components';

/* Guards */
import * as subscriptionGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: subscriptionContainers.SubscriptionComponent,
    // },
    {
        path: 'Plan',
        canActivate : [],
        component:subscriptionContainers.SubscriptionLayoutComponent ,
        children: [
            {
                path: '',
                component: subscriptionComponent.PlanListComponent,
            }
        ],
    },
    {
        path: 'Software',
        canActivate : [],
        component:subscriptionContainers.SubscriptionLayoutComponent ,
        children: [
            {
                path: '',
                component: subscriptionComponent.SoftwareListComponent,
            }
        ],
    },
    {
        path: 'Option',
        canActivate : [],
        component:subscriptionContainers.SubscriptionLayoutComponent ,
        children: [
            {
                
                path: '',
                component: subscriptionComponent.OptionListComponent,
            }
          
           
        ],
    }
    ,
    {
        path: 'Offer',
        canActivate : [],
        component:subscriptionContainers.SubscriptionLayoutComponent ,
        children: [
            {
                
                path: '',
                component: subscriptionComponent.OfferListComponent,
            }
          
           
        ],
    },
    {
        path: 'Order',
        canActivate : [],
        component:subscriptionContainers.SubscriptionLayoutComponent ,
        children: [
            {
                
                path: '',
                component: subscriptionComponent.OrderListComponent,
            },
            {
                
                path: 'Details',
                component: subscriptionComponent.OrderDetailsComponent,
            }
            ,
            {
                
                path: 'Edit',
                component: subscriptionComponent.EditOrderComponent,
            } ,
            {
                
                path: 'Upgreate',
                component: subscriptionComponent.UpgreadOrderComponent,
            }
            
          
           
        ],
    }
];

@NgModule({
    imports: [SubscriptionModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
