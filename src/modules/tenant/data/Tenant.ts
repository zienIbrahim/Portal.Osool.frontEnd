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
    isPOSUser: boolean;
  }
  export interface EditTenantRequest {
    id: string;
    name: string;
    databaseName: string;
    tenantGroupTypeId: number;
    users: EditUsersTenant[];
}
export interface EditUsersTenant {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    admin: boolean;
    tenantUserId: number;
    isActive: boolean;
    isPOSUser: boolean;
}
export interface TenantSubscription {
  subscriptionId: number;
  tenantId: string;
  trialPeriodStartDate: string | null;
  trialPeriodEndDate: string | null;
  subscribeAfterTrial: boolean;
  currentPlanId: number;
  offerId: number | null;
  numberOfCurrentUser: number;
  numberOfCurrentUserPOS: number;
  offerStartDate: string | null;
  offerEndDate: string | null;
  dateSubscribed: string;
  validTo: string;
  dateUnsubscribed: string | null;
}
export interface TenantFilters {
  Name?: string;
  Id?: string;
  DatabaseName?: string;
  pageNumber:number;
  pageSize:number; 
}
