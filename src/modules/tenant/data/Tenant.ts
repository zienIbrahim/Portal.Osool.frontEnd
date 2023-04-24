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
  export interface TenantDetails {
    id: string
    name: string
    databaseName: string
    tenantGroupTypeId: number
    insertTs: string
    userInGroups: UserInGroup[]
  }
  
  export interface UserInGroup {
    userId: string
    userName: string
    email: string
    phoneNumber: string
    tenantUserId: number
    timeAdded: string
    timeRemoved: any
    groupAdmin: boolean
    tenantId: string
    isActive: boolean
  }
