import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenantGroupType, AddTenantGroupType } from '../data/TenantGroupType';
import { EditTenantRequest, TenantFilters } from '../data/Tenant';

@Injectable()
export class TenantService {
  constructor(public http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  GetAllTenant(filter:TenantFilters) {
    let params = new HttpParams();
    params = params.append('PageNumber', String(filter.pageNumber));
    params = params.append('PageSize', String(filter.pageSize));
    if(filter.Name){
      params = params.append('Name', filter.Name);
    }
    if(filter.DatabaseName){
      params = params.append('DatabaseName', filter.DatabaseName);
    }
    if(filter.Id){
      params = params.append('Id', filter.Id);
    }
    return this.http.get(this.apiUrl + "Tenant/GetAllTenant",{params});
  }
  GetTenantById(TenantId: string) {
    return this.http.get(
      this.apiUrl + 'Tenant/GetTenantById?tenantId=' + TenantId
    );
  }
  GetGetTenantSubscriptions(TenantId: string) {
    return this.http.get(this.apiUrl + 'Subscriptions/GetGetTenantSubscriptions?TeanatId=' + TenantId);
  }
  AddTenant(data: any) {
    return this.http.post(this.apiUrl + 'Tenant/AddTenant', data);
  }
  EditTenant(EditRequest: EditTenantRequest) {
    return this.http.put(this.apiUrl + 'Tenant/EditTenant', EditRequest);
  }

  GetAllTenantGroupType(_pageSize: number, _pageNumber: number) {
    return this.http.get(
      this.apiUrl +
        `TenantGroupType/GetAllTenantGroupType?PageNumber=${_pageNumber}&PageSize=${_pageSize}`
    );
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
}
