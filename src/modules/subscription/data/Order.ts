
export interface AddNewOrderDto{
     tenantId :string
     planId :number
     offerId :number
     numberOfMonth :number
     validTo :string
     orderDetails :AddNewOrderDetailDto[]
}
export interface EditOrderDto{
  tenantId :string
  planId :number
  oredreId :number
  offerId :number
  numberOfMonth :number
  validTo :string
  status :number
  orderDetails :AddNewOrderDetailDto[]
}
export interface UpgrateOrderDto{
  tenantId: string
  subscriptionId: number
  planId: number
  offerId: number
  numberOfMonth: number
  validTo: string
  upgreateOrderDetail: UpgreateOrderDetail[]
}

export interface UpgreateOrderDetail {
  optionId: number
  qty: number
}
export interface AddNewOrderDetailDto
{
    optionId :number
    qty :number
}
export interface OrdersListFilters{
        pageNumber: number;
        pageSize: number;
        from?: string;
        to?: string;
        planId?: number;
        tenantId?: string;
        userId?: string;
        orderType?: number;
        status?: number;
}
export interface OrdersList {
    id: number;
    tenantName: string;
    validTo: string | null;
    creationDate: string | null;
    totalPrice: number | null;
    discount: number | null;
    userName: string;
    status: number | null;
}
export interface OrderById{
    id: number
    planId: number
    userId: string
    tenantId: string
    validTo: string | null
    creationDate: string
    offerId: number| null
    notes: string
    planPrice: number
    totalPrice: number
    discount: number
    taxAmount: number
    sellerId: number
    orderType: number
    status: number
    numberOfMonth: number
    userName: string
    planName: string
    offerName: string| null
    tenantName: string

    orderDetails: OrderDetail[]
    payments: Payment[]
}
  export interface OrderDetail {
    id: number
    optionNameAr: string
    optionNameEn: string
    orderId: number
    optionId: number
    optionPrice: number
    qty: number
    taxAmount: number
}
  export interface Payment {
    id: number
    orderId: number
    createdBy: string
    createdAt: string
    totalPrice: number
    status: number
    payemntType: number
    transactionId: any
}
export interface CheckoutData {
  paymentMethod: number;
  paidAmount: number;
  orderId: number;
}

  