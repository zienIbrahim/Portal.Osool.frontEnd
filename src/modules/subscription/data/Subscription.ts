export interface CreateNewSubscription {
    tenantId: string
    trialSubscription: boolean
    currentPlanId: number
    offerId: number
    numberOfCurrentUser: number
    numberOfCurrentUserPOS: number
    numberOfMonth: number
    validTo: string
  }
  export interface CreateNewSubscriptionParam {
    tenantId: string,
    tenantName: string,
  }

  