import { CreateTenantComponent } from './Tenant/create-tenant/create-tenant.component';
import { EditTenantComponent } from './Tenant/edit-tenant/edit-tenant.component';
import { TenantTenantListComponent }   from './Tenant/tenant-tenant-list/tenant-tenant-list.component';
import { AddTenantGroupTypeComponent } from './TenantGroupType/add-tenant-group-type/add-tenant-group-type.component';
import { EditTenantGroupTypeComponent } from './TenantGroupType/edit-tenant-group-type/edit-tenant-group-type.component';
import { TenantGroupTypeListComponent } from './TenantGroupType/tenant-group-type-list/tenant-group-type-list.component';
import { CreateTenantUserComponent } from './TenantUser/create-tenant-user/create-tenant-user.component';
import { EditTenantUserComponent } from './TenantUser/edit-tenant-user/edit-tenant-user.component';
import { TenantUserListComponent } from './TenantUser/tenant-user-list/tenant-user-list.component';

export const components = [
  TenantTenantListComponent,
  TenantGroupTypeListComponent,
  AddTenantGroupTypeComponent,
  EditTenantGroupTypeComponent,
  CreateTenantComponent,
  EditTenantComponent,
  TenantUserListComponent,
  CreateTenantUserComponent,
  EditTenantUserComponent
];

 export * from './Tenant/tenant-tenant-list/tenant-tenant-list.component';
 export * from './TenantGroupType/add-tenant-group-type/add-tenant-group-type.component';
 export *  from './TenantGroupType/edit-tenant-group-type/edit-tenant-group-type.component';
 export *  from './TenantGroupType/tenant-group-type-list/tenant-group-type-list.component';
 export * from './TenantUser/create-tenant-user/create-tenant-user.component';
 export *  from './TenantUser/edit-tenant-user/edit-tenant-user.component';
 export *  from './TenantUser/tenant-user-list/tenant-user-list.component';
 export *  from './Tenant/create-tenant/create-tenant.component';
 export * from './Tenant/edit-tenant/edit-tenant.component';