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
  export interface SubscriptionById {
    subscriptionId: number
    newSubscriptionId: any
    tenantId: string
    tenantName: string
    planId: number
    planName: string
    paymentId: number
    numberOfCurrentUser: number
    numberOfCurrentUserPos: number
    validTo: string
    validFrom: string
    createdBy: string
    modifiedBy: string
    createdAt: string
    modifiedAt: string
    status: number
    notes: string
    subscriptionDetails: SubscriptionDetail[]
    subscriptionOrder: SubscriptionOrder
  }
  
  export interface SubscriptionDetail {
    optionId: number
    optionName: string
    qty: number
  }
  
  export interface SubscriptionOrder {
    id: number
    planId: number
    userId: string
    tenantId: string
    subscriptionId: number
    validTo: string
    creationDate: string
    offerId: any
    notes: string
    planPrice: number
    totalPrice: number
    numberOfMonth: number
    discount: number
    taxAmount: number
    sellerId: number
    orderType: number
    status: number
    subscriptionOffer: any
    orderDetail: OrderDetail[]
    subscriptionPayment: SubscriptionPayment[]
  }
  
  export interface OrderDetail {
    optionId: number
    optionPrice: number
    qty: number
    taxAmount: number
  }
  
  export interface SubscriptionPayment {
    id: number
    orderId: number
    createdBy: string
    confirmedBy: any
    createdAt: string
    totalPrice: number
    paidAmount: number
    status: number
    payemntType: number
    subscriptionId: number
    transactionId: any
  }

  