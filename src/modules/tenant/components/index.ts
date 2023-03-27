import { TenantTenantListComponent }   from './Tenant/tenant-tenant-list/tenant-tenant-list.component';
import { AddTenantGroupTypeComponent } from './TenantGroupType/add-tenant-group-type/add-tenant-group-type.component';
import { EditTenantGroupTypeComponent } from './TenantGroupType/edit-tenant-group-type/edit-tenant-group-type.component';
import { TenantGroupTypeListComponent } from './TenantGroupType/tenant-group-type-list/tenant-group-type-list.component';

export const components = [
  TenantTenantListComponent,
  TenantGroupTypeListComponent,
  AddTenantGroupTypeComponent,
  EditTenantGroupTypeComponent,
];

 export * from './Tenant/tenant-tenant-list/tenant-tenant-list.component';
 export * from './TenantGroupType/add-tenant-group-type/add-tenant-group-type.component';
 export *  from './TenantGroupType/edit-tenant-group-type/edit-tenant-group-type.component';
 export *  from './TenantGroupType/tenant-group-type-list/tenant-group-type-list.component';