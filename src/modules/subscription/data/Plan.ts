export interface PlanList{
        planId: number
        softwareId: number
        planName: string
        userGroupName: string
        softwareName: string
        monthlyPlanPrice: number
        yearlyPlanPrice: number
        isActive: boolean
        userGroupTypeId: number
        maxUsers: number
        maxBranches: number
        includeUsers: number
        includeBranches: number

}
export interface Plan{
        planId: number
        softwareId: number
        planName: string
        userGroupName: string
        softwareName: string
        monthlyPlanPrice: number
        yearlyPlanPrice: number
        isActive: boolean
        userGroupTypeId: number
        maxUsers: number
        maxBranches: number
        includeUsers: number
        includeBranches: number
        options:PlanOptions[]
        offers:PlanOffer[]

}
export interface PlanOptions{
        id:number,
        type:number,
        optionNameAr: string,
        optionNameEn: string,
        price:number      
      }
      export interface PlanOffer{
        offerId: number    ,
        offerName: string,
        description: string,
        price:number,
        offerStartDate:Date ,
        offerEndDate:Date,
        yearlyDiscount:number,
        monthlyDiscount:number,
        isActive:boolean,

      }
export interface AddPlan{
        softwareId: number
        planName: string
        userGroupName: string
        softwareName: string
        monthlyPlanPrice: number
        yearlyPlanPrice: number
        isActive: boolean
        userGroupTypeId: number
        maxUsers: number
        maxBranches: number
        includeUsers: number
        includeBranches: number
        options:options[]
}

export interface options{
  optionId: number  ,
  price:  number        
}
export interface DDLPlanList {
        planId: number
        planName: string
        monthlyPlanPrice: number
        yearlyPlanPrice: number
        isActive: boolean
        userGroupTypeId: number
        maxUsers: number
        maxBranches: number
        includeUsers: number
        includeBranches: number
      }

