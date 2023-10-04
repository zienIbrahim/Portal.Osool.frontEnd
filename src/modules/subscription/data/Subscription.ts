export interface CreateNewSubscription {
    tenantId: string
    trialSubscription?: boolean
    currentPlanId: number
    offerId: number
    numberOfUser: number
    numberOfUserPOS: number
    numberOfMonth: number
    validTo: string
  }
  export interface CreateNewSubscriptionParam {
    tenantId: string,
    tenantName: string,
  }

  