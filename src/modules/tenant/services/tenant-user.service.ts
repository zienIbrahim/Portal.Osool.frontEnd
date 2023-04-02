import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddTenantUser } from '../data/TenantUser';

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {
  private apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,

) {}
GetAllTenantUsers(){
  return this.http.get(this.apiUrl + "TenantUsers/GetAllTenantUsers")
}
GetAllTenant(){
  return this.http.get(this.apiUrl + "Tenant/GetAllTenant")
}
AddTenantUser(data:AddTenantUser){
  return this.http.post(this.apiUrl + "TenantUsers/AddTenantUser",data)
}
}
