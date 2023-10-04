export interface TenantUserList {
    id: string;
    userName: string;
    phoneNumber: string;
    email: string;
  }
  export interface AddTenantUser{
    phoneNumber: string;
    email: string;
    password: string;
    tenantList:UserInTenant[]
  }
  export interface UserData {
    userId: string
    userName: string
    email: string
    phoneNumber: any
    isActive: boolean
    userInTenant: UserInTenant[]
  }
  
  export interface UserInTenant {
    tenantUserId: number
    timeAdded?: string
    groupAdmin: boolean
    tenantId: string
    isActive: boolean
    isPOSUser: boolean
  }
  
  export interface UserTenant {
    id: string
    name: string
    databaseName: string
    tenantGroupTypeId: number
    insertTs: string
    userTenantGroupType: UserTenantGroupType
  }
  
  export interface UserTenantGroupType {
    id: number
    typeName: string
  }
  export interface EditUserRequest {
    id: string
    userName: string
    email: string
    phoneNumber: string
    isActive: boolean
    userInGroups: EditUserInGroup[]
  }
  
  export interface EditUserInGroup {
    tenantUserId: number
    groupAdmin: boolean
    tenantId: string
    isActive: boolean
  }
  export interface UserList {
    id: string
    userName: string
    phoneNumber?: string
    email: string
  }
  export interface TenantUsersFilters {
    PageSize:number;
    PageNumber:number; 
    Email?: string;
    PhoneNumber?: string;
    UserName?: string;
    Id?: string;
  }
  
