export interface Offer{
    offerId: number
    offerName: string
    description: string
    offerStartDate: string
    offerEndDate: string
    yearlyDiscount: number
    monthlyDiscount: number
    isActive: boolean
}
export interface AddOffer{
    offerName: string
    description: string
    offerStartDate: string
    offerEndDate: string
    yearlyDiscount: number
    monthlyDiscount: number
    isActive: boolean
}