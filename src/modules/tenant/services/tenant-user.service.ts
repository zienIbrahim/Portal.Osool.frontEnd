import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddTenantUser, EditUserRequest } from '../data/TenantUser';

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {
  private apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,

) {}
GetAllTenantUsers(_pageSize: number, _pageNumber: number){
  return this.http.get(this.apiUrl + `TenantUsers/GetAllTenantUsers?PageNumber=${_pageNumber}&PageSize=${_pageSize}`)
}

GetUserTenantById(Id :string ){
  return this.http.get(this.apiUrl + "TenantUsers/GetTenantUserById?Id="+Id)
}
AddTenantUser(data:AddTenantUser){
  return this.http.post(this.apiUrl + "TenantUsers/AddTenantUser",data)
}
EditTenantUser(data:EditUserRequest){
  return this.http.put(this.apiUrl + "TenantUsers/EditTenantUser",data)
}
}
