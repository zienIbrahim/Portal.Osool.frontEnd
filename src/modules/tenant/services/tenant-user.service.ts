import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddTenantUser, EditUserRequest,TenantUsersFilters } from '../data/TenantUser';

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {
  private apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,

) {}

GetAllTenantUsers(filter:TenantUsersFilters) {
  let params = new HttpParams();
  params = params.append('PageNumber', String(filter.PageNumber));
  params = params.append('PageSize', String(filter.PageSize));
  if(filter.Id){
    params = params.append('Id', filter.Id);
  }
  if(filter.UserName){
    params = params.append('UserName', filter.UserName);
  }
  if(filter.Email){
    params = params.append('Email', filter.Email);
  }
  if(filter.PhoneNumber){
    params = params.append('PhoneNumber', filter.PhoneNumber);
  }
  return this.http.get(this.apiUrl + "TenantUsers/GetAllTenantUsers",{params});
}

GetUserTenantById(Id :string ){
  return this.http.get(this.apiUrl + "TenantUsers/GetTenantUserById?Id="+Id)
}
AddTenantUser(data:AddTenantUser){
  ///
  return this.http.post(this.apiUrl + "TenantUsers/AddTenantUser",data)
}
EditTenantUser(data:EditUserRequest){
  return this.http.put(this.apiUrl + "TenantUsers/EditTenantUser",data)
}
}
