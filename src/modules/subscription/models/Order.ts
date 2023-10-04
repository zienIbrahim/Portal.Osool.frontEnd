export enum OrderStatusEnum {
    Pending = 1,
    PastDue = 2,
    Canceled = 3,
    Completed = 4,
}

export const PayMethodLst: PayMethod[] = [{
    id: 1,
    name: "Cash",
},
{
    id: 2,
    name: "bank (network)",
},
{
    id: 3,
    name: "Bank transfer",
},
{
    id: 4,
    name: "Postpaid",
},
{
    id: 5,
    name: "Multi",
}
]

export const OrderStatusLst: OrderStatus[] = [{
    id: 1,
    name: "Pending",
},
{
    id: 2,
    name: "PastDue",
},
{
    id: 3,
    name: "Canceled",
},
{
    id: 4,
    name: "Completed",
},
]
export interface OrderStatus {
    id: number;
    name: string;
}
export interface PayMethod {
    id: number;
    name: string;
}
export interface OrderDetail {
    optionNameAr: string;
    optionNameEn: string;
    optionPrice: number;
    qty: number;
    taxAmount: number;
  }
  
  export interface Order {
    id: number;
    planId: number;
    validTo: string;
    creationDate: string;
    notes: string;
    planPrice: number;
    totalPrice: number;
    discount: number;
    taxAmount: number;
    orderType: number;
    status: number;
    userName: string;
    planName: string;
    offerName: string;
    tenantName: string;
    orderDetails: OrderDetail[];
    // payments: Payment[];
  }

