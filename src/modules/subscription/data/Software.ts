export interface SoftwareList{
softwareId: number,
softwareName: string,
details: string,
accessLink: string
}
export interface AddSoftware{
    softwareName: string,
details: string,
accessLink: string
}
export interface EditSoftware{
softwareId: number,
softwareName: string,
details: string,
accessLink: string
}
export interface Software{
    softwareId: number,
    softwareName: string,
    details: string,
    accessLink: string
    plans: Plan[]
    }
    export interface Plan {
        planId: number
        softwareId: number
        planName: string
        planPrice: number
        isActive: boolean
        userGroupTypeId: number
        maxUsers: number
        maxBranches: number
        includeUsers: number
        includeBranches: number
      }
