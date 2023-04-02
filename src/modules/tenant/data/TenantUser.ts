export interface TenantUserList {
    id: string;
    userName: string;
    phoneNumber: string;
    email: string;
  }
  export interface AddTenantUser{
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    tenantList:string[]
  }
