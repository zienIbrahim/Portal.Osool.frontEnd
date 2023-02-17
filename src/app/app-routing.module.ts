import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
},
{
  path: 'auth',
  loadChildren: () =>
      import('../modules/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
},
{
  path: 'Tenant',
  loadChildren: () =>
      import('../modules/tenant/tenant-routing.module').then((m) => m.TenantRoutingModule),
},
//  {
//   path: 'dashboard',
//   canActivate: [],
//   loadChildren: () =>
//       import('modules/dashboard/dashboard-routing.module').then(
//           (m) => m.DashboardRoutingModule
//       ),
// },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
