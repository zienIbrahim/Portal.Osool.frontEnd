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
  export interface UserData {
    userId: string
    userName: string
    email: string
    phoneNumber: any
    isActive: boolean
    userInGroups: UserInGroup[]
  }
  
  export interface UserInGroup {
    tenantUserId: number
    timeAdded: string
    timeRemoved: any
    groupAdmin: boolean
    tenantId: string
    userTenant: UserTenant
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
  
