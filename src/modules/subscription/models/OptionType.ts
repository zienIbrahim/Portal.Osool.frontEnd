export const OptionTypes: OptionType[] =[ {
    TypeId:1,
    TypeNameAr:"معدود",
    TypeNameEn:"Countable"
},
{
    TypeId:2,
    TypeNameAr:"غير معدود",
    TypeNameEn:"UnCountable"
}]
export interface OptionType{
    TypeId:number;
    TypeNameAr:string;
    TypeNameEn:string;
}

