import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddOption,Option } from '../data/Option';
import { AddPlan, Plan } from '../data/Plan';
import { AddSoftware, EditSoftware } from '../data/Software';
import { CreateNewSubscription } from '../data/Subscription';
import { AddOffer, Offer } from '../data/Offer';
import { AddNewOrderDto, CheckoutData, EditOrderDto, OrdersListFilters, UpgrateOrderDto } from '../data/Order';

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
    AddNewOrder(data:AddNewOrderDto){
        return this.http.post(this.apiUrl + "Order/AddNewOrder", data)
    }
    UpgreateOrder(data:UpgrateOrderDto){
        return this.http.post(this.apiUrl + "Order/UpgreateOrder", data)
    }
    EditOrder(data:EditOrderDto){
        return this.http.put(this.apiUrl + "Order/EditOrder", data)
    }
   
    EditSoftware(data:EditSoftware){
        return this.http.put(this.apiUrl + "Software/EditSoftware", data)
    }
    GetSoftwareById(SoftwareId:number){
        return this.http.get(this.apiUrl + "Software/GetSoftwareById?SoftwareId="+SoftwareId)
    }
    GetAllOffer(_pageSize:number,_pageNumber:number){
        return this.http.get(this.apiUrl + `Offers/GetAllOffer?PageNumber=${_pageNumber}&PageSize=${_pageSize}`)
    }
    AddOffer(data:AddOffer){
        return this.http.post(this.apiUrl + "Offers/AddOffer", data)
    }
    EditOffer(data:Offer){
        return this.http.put(this.apiUrl + "Offers/EditOffer", data)
    }
    CheckoutOrder(data:CheckoutData){
        return this.http.post(this.apiUrl + "Order/CheckoutOrder", data)
    }
    GetOfferById(OfferId:number){
        return this.http.get(this.apiUrl + "Offers/GetOfferById?OfferId="+OfferId)
    }
    GetOrderById(OrderId:number){
        return this.http.get(this.apiUrl + "Order/GetOrderById?OrderId="+OrderId)
    }
    GetSubscriptionById(SubscriptionId:number){
        return this.http.get(this.apiUrl + "Subscriptions/GetSubscriptionById?SubscriptionId="+SubscriptionId)
    }
    CanceleOrder(OrderId:number){
        return this.http.post(this.apiUrl + "Order/CanceleOrder",{orderId:OrderId})
    }
    GetOrdersList(filter:OrdersListFilters) {
        let params = new HttpParams();
        params = params.append('PageNumber', String(filter.pageNumber));
        params = params.append('PageSize', String(filter.pageSize));
        if(filter.planId){
          params = params.append('PlanId', filter.planId);
        }
        if(filter.tenantId){
          params = params.append('TenantId', filter.tenantId);
        }
        if(filter.userId){
          params = params.append('UserId', filter.userId);
        }
        if(filter.from){
            params = params.append('From', filter.from);
        }
        if(filter.to){
            params = params.append('To', filter.to);
        }
        if(filter.status){
            params = params.append('Status', filter.status);
        }
        if(filter.orderType){
            params = params.append('OrderType', filter.orderType);
        }
        return this.http.get(this.apiUrl + "Order/GetOrdersList",{params});
    }
}
