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

}
export interface PlanOptions{
        id: number    ,
        OptionName: string       
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
  optionId: number            
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

