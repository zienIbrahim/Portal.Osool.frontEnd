import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/Tenant',
},
{
  path: 'auth',
  loadChildren: () =>
      import('../modules/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
},
{
  path: 'Tenant',
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('../modules/tenant/tenant-routing.module').then((m) => m.TenantRoutingModule),
},
{
  path: 'Plan',
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('../modules/subscription/subscription-routing.module').then((m) => m.SubscriptionRoutingModule),
},
{
  path: 'error',
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('../modules/error/error-routing.module').then((m) => m.ErrorRoutingModule),
},
{
  path: 'Subscription',
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('../modules/subscription/subscription-routing.module').then((m) => m.SubscriptionRoutingModule),
},
//  {
//   path: 'dashboard',
//   canActivate: [],
//   loadChildren: () =>
//       import('modules/dashboard/dashboard-routing.module').then(
//           (m) => m.DashboardRoutingModule
//       ),
//  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
