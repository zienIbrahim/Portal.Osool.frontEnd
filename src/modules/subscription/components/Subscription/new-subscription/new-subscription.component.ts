import { SelectedDateRange } from './../../../../app-common/models/app-common.model';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { DDLPlanList, Plan } from 'src/modules/subscription/data/Plan';
import { CreateNewSubscriptionParam,CreateNewSubscription } from 'src/modules/subscription/data/Subscription';
import { SubscriptionService } from 'src/modules/subscription/services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent {
  Subscriptionform: FormGroup=<FormGroup>{};
  PlanList: DDLPlanList[] = [];
  TotalPrice:number=0;
  TotalPriceIncludVat:number=0;
  SelectedPlanData: Plan=<Plan>{}
  @Input()  TenantData: CreateNewSubscriptionParam=<CreateNewSubscriptionParam>{};

  constructor(private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private mastarDataService: MastarDataService,
    private _snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    this.intiForm();
    this._getMasterTable();

  }

  _getMasterTable(){
  this.mastarDataService.GetAllPlanList().subscribe({
    next: (value: any) => {
      this.PlanList = value.data;
    }});
}

  intiForm(){
    let endDate= new Date();
    endDate.setDate(endDate.getDate() + 14)
    this.Subscriptionform = this.formBuilder.group({
      tenantId: [{ value: this.TenantData.tenantId, disabled: true }, Validators.required],
      Tenantname: [{ value: this.TenantData.tenantName, disabled: true }, Validators.required],
      trialPeriodStartDate: [{ value: new Date(), disabled: true }],
      trialPeriodEndDate: [{ value: endDate, disabled: true }],
      currentPlanId: [null, Validators.required],
      offerId: [null],
      offerName:[null],
      numberOfCurrentUser: [null, Validators.required],
      numberOfMonth: [null, Validators.required],
      numberOfCurrentUserPOS: [null, Validators.required],
      validTo: [{ value: null, disabled: true }, Validators.required],
      trialSubscription: [false, Validators.required]
    })
  }

  onSubmit(addTemplateClose:MatIconButton){
    if (this.Subscriptionform.invalid) {
      return;
    }
    let Data: CreateNewSubscription ={
      tenantId: this.Subscriptionform.get('tenantId')?.value,
      trialSubscription: this.Subscriptionform.get('trialSubscription')?.value,
      currentPlanId: this.Subscriptionform.get('currentPlanId')?.value,
      offerId: this.Subscriptionform.get('offerId')?.value,
      numberOfCurrentUser: this.Subscriptionform.get('numberOfCurrentUser')?.value,
      numberOfMonth: this.Subscriptionform.get('numberOfMonth')?.value,
      numberOfCurrentUserPOS: this.Subscriptionform.get('numberOfCurrentUserPOS')?.value,
      validTo:formatDate(this.Subscriptionform.get('validTo')?.value, 'yyyy-MM-dd', 'en-UM') ,
    };
    if(Data.numberOfCurrentUser<Data.numberOfCurrentUserPOS){
      this.notificationService.error("Number Of User Must be great than POS Key");
    }
    this.subscriptionService.CreateNewSubscriptions(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Option Updated Successfully');
        addTemplateClose._elementRef.nativeElement.click();
      },
      complete: () => {},
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      },
    });
  }

  changeCurrentPlanId(){
   let currentPlanId= this.Subscriptionform.value.currentPlanId;
   this.subscriptionService.GetPlanById(currentPlanId).subscribe((res)=>{
    console.log("res :",res)

    this.SelectedPlanData=res as Plan;
    this.calcTotalPrice();
   }
  
  );
  }

  changeTrialSubscription(){
    if(this.Subscriptionform.value.trialSubscription){
      this.Subscriptionform.get('numberOfCurrentUserPOS')?.setValue(1)
      this.Subscriptionform.get('numberOfCurrentUser')?.setValue(2)
      this.Subscriptionform.get('numberOfCurrentUser')?.disable();
      this.Subscriptionform.get('numberOfCurrentUserPOS')?.disable()
      this.Subscriptionform.get('numberOfMonth')?.disable()
      this.Subscriptionform.get('numberOfMonth')?.setValue(0)
      this.Subscriptionform.get('validTo')?.setValue(this.Subscriptionform.get('trialPeriodEndDate')?.value)
    }
    else{
      let validTo= new Date();
      this.Subscriptionform.get('numberOfCurrentUserPOS')?.setValue(0)
      this.Subscriptionform.get('numberOfCurrentUser')?.setValue(2)
      this.Subscriptionform.get('numberOfCurrentUser')?.enable();
      this.Subscriptionform.get('numberOfCurrentUserPOS')?.enable();
      this.Subscriptionform.get('numberOfMonth')?.enable()
      this.Subscriptionform.get('numberOfMonth')?.setValue(1)
      this.Subscriptionform.get('validTo')?.setValue(validTo.getDate() + 30)
    }
    this.Subscriptionform.get('numberOfCurrentUser')?.updateValueAndValidity();
    this.Subscriptionform.get('numberOfCurrentUserPOS')?.updateValueAndValidity();
    this.Subscriptionform.get('numberOfMonth')?.updateValueAndValidity();
    this.calcTotalPrice()
  }

  changeNumberOfMonth(){
    let validTo= new Date();
   let numberOfMonth= this.Subscriptionform.value.numberOfMonth;
   validTo.setDate(validTo.getDate() + (numberOfMonth*30))
   console.log("numberOfMonth :",numberOfMonth)
   console.log("validTo :",validTo)
   this.Subscriptionform.get('validTo')?.setValue(validTo)
   this.Subscriptionform.get('validTo')?.updateValueAndValidity();
   this.calcTotalPrice()
  }

  calcTotalPrice(){
    if(!this.Subscriptionform.value.trialSubscription){

    let numberOfMonth=Number(this.Subscriptionform.value.numberOfMonth);

    let priceOfCurrentUser=
    (Number(this.Subscriptionform.value.numberOfCurrentUser)-this.SelectedPlanData.includeUsers)
    * Number(this.SelectedPlanData.options.find(x=> x.id==1)?.price);

    let priceOfCurrentUserPOS= Number(this.Subscriptionform.value.numberOfCurrentUserPOS) * Number(this.SelectedPlanData.options.find(x=> x.id==2)?.price);

    let planPrice=Number((numberOfMonth >=12)?this.SelectedPlanData?.yearlyPlanPrice:this.SelectedPlanData?.monthlyPlanPrice);

    console.log("priceOfCurrentUser :",priceOfCurrentUser)
    console.log("priceOfCurrentUserPOS :",priceOfCurrentUserPOS)
    console.log("Plan  includeUsers :",this.SelectedPlanData.includeUsers)
    console.log("Plan  options :",this.SelectedPlanData.options)
    // implemment Offer

    const today = new Date();

    let OfferEndDate=this.SelectedPlanData.offers[0].offerEndDate;

    let  offerList=   this.SelectedPlanData.offers?.filter(x=> x.isActive==true && new Date(x.offerEndDate)>=today);
   
    let discount= Math.max(...offerList.map(o => (numberOfMonth >=12)? o.yearlyDiscount: o.monthlyDiscount))
    
    planPrice=planPrice-((discount * planPrice)/100);

    console.log("planPrice after offer discount :", planPrice)

    this.TotalPrice=(priceOfCurrentUser+priceOfCurrentUserPOS + planPrice) * numberOfMonth;

    this.TotalPriceIncludVat=this.TotalPrice * 1.15;
  }
  else
  {
    this.TotalPrice=0;
    this.TotalPriceIncludVat=0;
  }
  }

  formatDate(d: any): string {
    return [
        d.year,
        d.month < 10 ? '0' + d.month : d.month,
        d.day < 10 ? '0' + d.day : d.day,
    ].join('-');
}

  get f() {
    return this.Subscriptionform.controls
   }

}
