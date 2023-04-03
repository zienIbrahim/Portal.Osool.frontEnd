export interface TenantList {
    id: string;
    name: number;
    databaseName: number;
  }
  export interface TenantUserList {
    index:number
    userName: string
    email: string
    phoneNumber: string
    password: string
  }
  export interface AddTenant {
    name: string
    databaseName: string
    tenantGroupTypeId: number
    userName: string
    email: string
    phoneNumber: string
    password: string
  }