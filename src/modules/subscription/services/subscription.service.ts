import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddOption,Option } from '../data/Option';
import { AddPlan, Plan } from '../data/Plan';
import { AddSoftware, EditSoftware } from '../data/Software';
import { CreateNewSubscription } from '../data/Subscription';

@Injectable()
export class SubscriptionService {
    private apiUrl = environment.apiUrl;
    
    constructor(public http: HttpClient) {

    }
    //List MAsterData
    GetAllOptionList(_pageSize:number,_pageNumber:number){
        return this.http.get(this.apiUrl + `Option/GetAllOption?PageNumber=${_pageNumber}&PageSize=${_pageSize}`)
    }
    AddOtion(data:AddOption){
        return this.http.post(this.apiUrl + "Option/AddOption", data)
    }
    EditOption(data:Option){
        return this.http.put(this.apiUrl + "Option/EditOption", data)
    }

    GetAllPlan(_pageSize:number,_pageNumber:number){
        return this.http.get(this.apiUrl + `Plan/GetAllPlan?PageNumber=${_pageNumber}&PageSize=${_pageSize}`)
    }
    GetPlanById(PlanId:number){
        return this.http.get(this.apiUrl + "Plan/GetPlanById?PlanId="+PlanId)
    }
    AddPlan(data:AddPlan){
        return this.http.post(this.apiUrl + "Plan/AddPlan", data)
    }
    EditPlan(data:Plan){
        return this.http.put(this.apiUrl + "Plan/EditPlan", data)
    }


    GetAllSoftware(_pageSize:number,_pageNumber:number){
        return this.http.get(this.apiUrl + `Software/GetAllSoftware?PageNumber=${_pageNumber}&PageSize=${_pageSize}`)
    }
    AddSoftware(data:AddSoftware){
        return this.http.post(this.apiUrl + "Software/AddSoftware", data)
    }
    CreateNewSubscriptions(data:CreateNewSubscription){
        return this.http.post(this.apiUrl + "Subscriptions/CreateNewSubscriptions", data)
    }
   
    EditSoftware(data:EditSoftware){
        return this.http.put(this.apiUrl + "Software/EditSoftware", data)
    }
    GetSoftwareById(SoftwareId:number){
        return this.http.get(this.apiUrl + "Software/GetSoftwareById?SoftwareId="+SoftwareId)
    }
   
}
