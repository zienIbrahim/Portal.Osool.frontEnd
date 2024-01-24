
import { CreateOfferComponent } from "./Offer/create-offer/create-offer.component";
import { EditOfferComponent } from "./Offer/edit-offer/edit-offer.component";
import { OfferListComponent } from "./Offer/offer-list/offer-list.component";
import { CreateOptionComponent } from "./Option/create-option/create-option.component";
import { EditOptionComponent } from "./Option/edit-option/edit-option.component";
import { OptionListComponent } from "./Option/option-list/option-list.component";
import { AddOrderComponent } from "./Order/add-order/add-order.component";
import { EditOrderComponent } from "./Order/edit-order/edit-order.component";
import { OrderCkeckoutComponent } from "./Order/order-ckeckout/order-ckeckout.component";
import { OrderDetailsComponent } from "./Order/order-details/order-details.component";
import { OrderListComponent } from "./Order/order-list/order-list.component";
import { UpgreadOrderComponent } from "./Order/upgread-order/upgread-order.component";
import { CreatePlanComponent } from "./Plan/create-plan/create-plan.component";
import { EditPlanComponent } from "./Plan/edit-plan/edit-plan.component";
import { PlanListComponent } from "./Plan/plan-list/plan-list.component";
import { CreateSoftwareComponent } from "./Software/create-software/create-software.component";
import { EditSoftwareComponent } from "./Software/edit-software/edit-software.component";
import { SoftwareListComponent } from "./Software/software-list/software-list.component";
import { NewSubscriptionComponent } from "./Subscription/new-subscription/new-subscription.component";
import { RenewSubscriptionComponent } from "./Subscription/renew-subscription/renew-subscription.component";
import { TenantSubscriptionComponent } from "./Subscription/tenant-subscription/tenant-subscription.component";

export const components = [
  RenewSubscriptionComponent, 
  NewSubscriptionComponent,
  TenantSubscriptionComponent,
  PlanListComponent,
  CreatePlanComponent,
  EditPlanComponent,
  OptionListComponent,
  CreateOptionComponent,
  EditOptionComponent,
  SoftwareListComponent,
  EditSoftwareComponent,
  CreateSoftwareComponent,
  OfferListComponent,
  CreateOfferComponent,
  EditOfferComponent,
  AddOrderComponent,
  EditOrderComponent,
  OrderCkeckoutComponent,
  OrderListComponent,
  UpgreadOrderComponent,
  OrderDetailsComponent
];

export * from "./Option/create-option/create-option.component";
export * from "./Option/edit-option/edit-option.component";
export * from "./Option/option-list/option-list.component";
export * from "./Plan/create-plan/create-plan.component";
export * from "./Plan/edit-plan/edit-plan.component";
export * from "./Plan/plan-list/plan-list.component";
export * from "./Software/create-software/create-software.component";
export * from "./Software/edit-software/edit-software.component";
export * from "./Software/software-list/software-list.component";
export * from "./Subscription/new-subscription/new-subscription.component";
export * from "./Subscription/renew-subscription/renew-subscription.component";
export * from "./Subscription/tenant-subscription/tenant-subscription.component";
export * from "./Offer/create-offer/create-offer.component"
export * from "./Offer/edit-offer/edit-offer.component";
export * from "./Offer/offer-list/offer-list.component";
export * from "./Order/add-order/add-order.component";
export * from "./Order/edit-order/edit-order.component";
export * from "./Order/order-list/order-list.component";
export * from "./Order/order-details/order-details.component";
export * from "./Order/order-ckeckout/order-ckeckout.component";
export * from "./Order/upgread-order/upgread-order.component";