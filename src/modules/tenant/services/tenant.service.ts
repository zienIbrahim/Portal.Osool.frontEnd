import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenantGroupType, AddTenantGroupType } from '../data/TenantGroupType';
import { EditTenantRequest } from '../data/Tenant';

@Injectable()
export class TenantService {
  constructor(public http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getTenant$(): Observable<{}> {
    return of({});
  }
  GetAllTenant() {
    return this.http.get(this.apiUrl + 'Tenant/GetAllTenant');
  }
  GetAllTenantGroupType() {
    return this.http.get(this.apiUrl + 'TenantGroupType/GetAllTenantGroupType');
  }
  AddTenantGroupType(data: AddTenantGroupType) {
    return this.http.post(
      this.apiUrl + 'TenantGroupType/AddTenantGroupType',
      data
    );
  }
  EditTenantGroupType(data: TenantGroupType) {
    return this.http.put(
      this.apiUrl + 'TenantGroupType/EditTenantGroupType',
      data
    );
  }
  AddTenant(data: any) {
    return this.http.post(this.apiUrl + 'Tenant/AddTenant', data);
  }
  GetTenantById(TenantId: string) {
    return this.http.get(
      this.apiUrl + 'Tenant/GetTenantById?tenantId=' + TenantId
    );
  }
  EditTenant(EditRequest: EditTenantRequest) {
    return this.http.put(this.apiUrl + 'Tenant/EditTenant', EditRequest);
  }
}
