import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AuthService } from 'src/modules/auth/services';
import { EditOrderDto, OrderById, UpgrateOrderDto } from 'src/modules/subscription/data/Order';
import { DDLPlanList, Plan, PlanOptions } from 'src/modules/subscription/data/Plan';
import { OrderStatus, OrderStatusEnum, OrderStatusLst } from 'src/modules/subscription/models/Order';
import { SubscriptionService } from 'src/modules/subscription/services';
import { parseZone as moment } from "moment";
import { SubscriptionById } from 'src/modules/subscription/data/Subscription';


@Component({
  selector: 'app-upgread-order',
  templateUrl: './upgread-order.component.html',
  styleUrls: ['./upgread-order.component.scss']
})
export class UpgreadOrderComponent {
  Subscriptionform: FormGroup=<FormGroup>{};
  OrderDeatilsList: FormArray=<FormArray>{};
  PlanList: DDLPlanList[] = [];
  TotalPrice:number=0;
  checkedAllOption:boolean=false;
  TotalPriceIncludVat:number=0;
  ReminingDays:number=0;
  ReminingAmount:number=0;
  SelectedPlanData: Plan=<Plan>{}
  order: OrderById = <OrderById>{};
  Subscription: SubscriptionById = <SubscriptionById>{};
  SubscriptionId: number = 0;
  orderStatusList: OrderStatus[] = [];
_math:any
  constructor(private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private mastarDataService: MastarDataService,
    private route: ActivatedRoute, private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {    this.orderStatusList = OrderStatusLst;
      this._math=Math
    }
  ngOnInit(): void {
    this.intiForm();
    this._getMasterTable();
    this.GetSubscriptionById()

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
      tenantId: [{ value: null, disabled: true }, Validators.required],
      Tenantname: [{ value: null, disabled: true }, Validators.required],
      currentPlanId: [null, Validators.required],
      orderId: [null, Validators.required],
      numberOfMonth: [null, Validators.required],
      status: [{ value: null, disabled: false}, Validators.required],
      checkedAllOption: [true, Validators.required],
      validTo: [{ value: null, disabled: false }, Validators.required],
      orderDetails: this.formBuilder.array([]),
    })
  }

  GetSubscriptionById() {
    this.route.queryParams.subscribe((params) => {
      if (params['subscriptionId']) {
        this.SubscriptionId = params['subscriptionId'];
      }
    });
    this.subscriptionService.GetSubscriptionById(this.SubscriptionId).subscribe((data: any) => {
      this.Subscription = data;
     
      // Set the order details data source
      this._setFormValue()
    })
  }

 calculateDiff2(dateSent:any,date:any){
  let currentDate = new Date(date);
  dateSent = new Date(dateSent);
  return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
 }

 async _setFormValue(){
    this.Subscriptionform.patchValue({
      tenantId: this.Subscription.tenantId,
      Tenantname: this.Subscription.tenantName,
      currentPlanId: this.Subscription.planId,
      // numberOfMonth:Math.abs(this.calculateDiff(this.Subscription.validTo) /30),
      validTo:this.Subscription.validTo,
      orderId: this.SubscriptionId,
      status:this.Subscription.status,
    })
    this.SelectedPlanData= await lastValueFrom(this.subscriptionService.GetPlanById(this.Subscription.planId)) as Plan; 
    this.setPlanDetails()
    this.changeValidTo();
    this.CalculateRemaining();
    this.Subscription.subscriptionOrder.orderDetail.forEach((item:any)=> {
    if(this.SelectedPlanData.options.find(x=> x.id==item.optionId)){
        this.getorderDetails.value.forEach((from:any,index:number)=>{
         if(from.optionId==item.optionId) 
        { 
          this.getorderDetails.controls[index].patchValue({
            qty:item.qty
          })
          
        }
        }) 
      }
    })
    this.calcTotalPrice()
 }

  addOrderDeatils(){
    this.OrderDeatilsList = this.getorderDetails;
    this.OrderDeatilsList.push(this.formBuilder.group({
      optionId: [null, [Validators.required]],
      optionName: [ {value: null, disabled: true}, [Validators.required]],
      price: [{value: null, disabled: true}, [Validators.required]],
      qty: [0, [Validators.required]],
      checked: [true, [Validators.required]],
     }));
  }

  _checkedAllOptionChange(){
    this.checkedAllOption=Boolean(this.Subscriptionform.value.checkedAllOption)
      this.SelectedPlanData.options.forEach((option:PlanOptions,index:number)=>{
        this.getorderDetails.controls[index].get("checked")?.setValue(this.checkedAllOption);
      });
      this.calcTotalPrice()
  }

  onSubmit(){

    const DueAmount =  this.TotalPrice - this.ReminingAmount;

    if (this.Subscriptionform.invalid) {

      this.Subscriptionform.markAllAsTouched();
      return;
    }
    console.log("Due Amount :",DueAmount)
   if(DueAmount<=0){
    this.notificationService.error('due amount must be grater than or Equal 0 !');
    return;
   }
    let Data: UpgrateOrderDto = {
      tenantId: this.Subscriptionform.get('tenantId')?.value,
      planId: this.Subscriptionform.get('currentPlanId')?.value,
      offerId: this.Subscriptionform.get('offerId')?.value,
      numberOfMonth: this.Subscriptionform.get('numberOfMonth')?.value,
      validTo: formatDate(this.Subscriptionform.get('validTo')?.value, 'yyyy-MM-dd', 'en-UM'),
      subscriptionId:this.SubscriptionId,
      upgreateOrderDetail: this.Subscriptionform.get('orderDetails')?.value.map((item: any) => {
        return {
          optionId: item.optionId,
          qty: item.qty
        }
      })
    };
    this.subscriptionService.UpgreateOrder(Data).subscribe({
      next: (value: any) => {
        console.log('UpgreateOrder value',value)
        this.notificationService.success('Upgreate Order Saved Successfully');
        this.router.navigate([`Subscription/Order/Details`], { queryParams: { OrderId:value.orderId } });
      },
      complete: () => { },
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      },
    });

  }

  changeCurrentPlanId(){
   let currentPlanId= this.Subscriptionform.value.currentPlanId;
   this.subscriptionService.GetPlanById(currentPlanId).subscribe((res)=>{
   this.SelectedPlanData=res as Plan;
   this.setPlanDetails();
   }
  
  );
  }

  setPlanDetails(){
    this.getorderDetails?.clear();
    this.SelectedPlanData.options.forEach((option:PlanOptions,index:number)=>{
      this.addOrderDeatils();
            this.getorderDetails.controls[index].patchValue({
        optionId: option.id,
        optionName: option.optionNameAr,
        price: option.price,
        qty: 0,
      });
      if(option.type==2){
        this.getorderDetails.controls[index].get("qty")?.disable();
        this.getorderDetails.controls[index].get("qty")?.setValue(1);
      }
      if(option.id==1){
        this.getorderDetails.controls[index].get("qty")?.setValidators( [Validators.required,Validators.max(this.SelectedPlanData.maxUsers)]);
        this.getorderDetails.controls[index].get("qty")?.updateValueAndValidity();
      }

    });
    this.calcTotalPrice();
  }

  changeNumberOfMonth(){
    let numberOfMonth= this.Subscriptionform.value.numberOfMonth;
    let validTo= moment(new Date()).add(numberOfMonth,'month');
    this.Subscriptionform.get('validTo')?.setValue(validTo.toDate())
    this.Subscriptionform.get('validTo')?.updateValueAndValidity();
    this.calcTotalPrice()
  }

  calculateDiff(dateSent:any){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  changeValidTo(){
    const NumberOfMonth=Math.abs((this.calculateDiff(this.Subscriptionform.get('validTo')?.value)/30));
    this.Subscriptionform.get('numberOfMonth')?.setValue(NumberOfMonth)
    this.Subscriptionform.get('numberOfMonth')?.updateValueAndValidity();
    this.calcTotalPrice()
  }

  calcTotalPrice(){
    let numberOfMonth=Math.abs(Number(this.Subscriptionform.value.numberOfMonth));
    let planPrice:number=0;

    const orderDetails= this.getorderDetails.getRawValue();
     planPrice=this.calculatePlanePrice

    let TotalPriceorderDetails:number=0;

    orderDetails.forEach((element:any,index:number)=> {
      if(element.checked)
      {
        TotalPriceorderDetails +=  Number(element.price *element.qty);
      }
    });
    console.log("planPrice :",planPrice)
    // implemment Offer
    const today = new Date();
    let  offerList=   this.SelectedPlanData.offers?.filter(x=> x.isActive==true && new Date(x.offerEndDate)>=today);

    if(offerList.length != 0)
    {
      let discount=  Math.max(...offerList.map(o => (numberOfMonth >=12)? o.yearlyDiscount: o.monthlyDiscount))
      planPrice=planPrice-((discount * planPrice)/100);
    }

    this.TotalPrice=(TotalPriceorderDetails + planPrice) * numberOfMonth;

    this.TotalPriceIncludVat=this.TotalPrice * 1.15;
    
  }

  CalculateRemaining(){
    const validTo= this.Subscription.validTo;
    const RemainingDays=Math.abs(this.calculateDiff(validTo))
    let extraOptionValue:number=0; 
    let RemainingPakgeVlaue:number=0;
     RemainingPakgeVlaue = Number((this.Subscription.subscriptionOrder.planPrice /30) * RemainingDays);
   
    this.Subscription.subscriptionOrder.orderDetail.forEach(item=>{
   
     extraOptionValue+= ((item.qty * item.optionPrice)/30);
   
   
    });

    extraOptionValue= extraOptionValue * RemainingDays
    console.log("extraOptionValue :",extraOptionValue)
    console.log("RemainingPakgeVlaue :",RemainingPakgeVlaue)
    this.ReminingAmount=RemainingPakgeVlaue +extraOptionValue;
    this.ReminingDays=RemainingDays;
   
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

  get getorderDetailsControls() {
    return (this.Subscriptionform.get('orderDetails') as FormArray).controls;
  }

  get getorderDetails() :FormArray {
    return   this.Subscriptionform.get('orderDetails') as FormArray; 
  }

  getStatusClass(status: number) {
    switch (status) {
      case OrderStatusEnum.Pending:
       { return 'status-pending'}
      case OrderStatusEnum.PastDue:
        {return 'status-past-due'}
      case OrderStatusEnum.Canceled:
        {return 'status-canceled'}
      case OrderStatusEnum.Completed:
        {return 'status-completed'}
      default: {return 'status-default'}
    }
  }
  
  changeOptionQty(index:number){
    let ExtraUserQty:number=0;
    let PosKeyQty:number=0;
    const orderDetails= this.getorderDetails.getRawValue();

    orderDetails.forEach((element:any,index:number)=> {
      if(element.optionId==2){
        PosKeyQty=element.qty
      }
      if(element.optionId==1){
        ExtraUserQty=element.qty
      }
    });
    if((this.SelectedPlanData.includeUsers+ExtraUserQty)>this.SelectedPlanData.maxUsers){
      orderDetails.forEach((element:any,index:number)=> {
        if(element.optionId==1){
          this.getorderDetails.controls[index].get("qty")?.setValue(0);
        }
      });
    }
    if((this.SelectedPlanData.includeUsers+ExtraUserQty)<PosKeyQty){
      orderDetails.forEach((element:any,index:number)=> {
        if(element.optionId==2){
          this.getorderDetails.controls[index].get("qty")?.setValue(0);
        }
      });
    }
    this.calcTotalPrice()
  }

  get isSameExtraOption(): boolean {
    const Subscription = this.Subscription.subscriptionOrder.orderDetail.map(item => {
      return {
        id: item.optionId,
        qty: item.qty
      }
    })
    const from = this.Subscriptionform.value.orderDetails.map((item: any) => {
      return {
        id: item.optionId,
        qty: item.qty
      }
    })
    let result = JSON.stringify(Subscription) === JSON.stringify(from);
    return result;
  }

  get isSameValidTo (): boolean { 
    return  moment(this.Subscription.validTo, 'DD-MM-YYYY').isSame(moment(this.Subscriptionform.value.validTo, 'DD-MM-YYYY'))
  }

  get isSamePlan (): boolean {
    return this.SelectedPlanData.planId==this.Subscription.subscriptionOrder.planId
  
  }

  getYearDiff(dateOne :any, dateTwo:any) {
    return dateOne.diff(dateTwo, 'years', true);
  }

  get calculatePlanePrice(): number {
    let basePrice = 0;
    let numberOfMonth=Math.abs(Number(this.Subscriptionform.value.numberOfMonth));
    let YearDiff = Math.abs(Number(this.getYearDiff(moment(this.Subscription.validTo),moment(this.Subscriptionform.value.validTo)).toFixed(2)))
   
    if (this.isSameValidTo && this.isSamePlan && this.isSameExtraOption) {
      basePrice= this.Subscription.subscriptionOrder.planPrice

      return basePrice;
    } 
    else if (this.isSameValidTo && this.isSamePlan) {
      basePrice= this.Subscription.subscriptionOrder.planPrice

      return basePrice; 
    } 
    else if (this.isSameValidTo && this.isSameExtraOption) {
      basePrice=Number((numberOfMonth  >=12)?this.SelectedPlanData?.yearlyPlanPrice:this.SelectedPlanData?.monthlyPlanPrice);
      return basePrice ; 
    }
    else if (this.isSamePlan && this.isSameExtraOption) {
   
      basePrice=Number((YearDiff  >=1)?this.SelectedPlanData?.yearlyPlanPrice:this.SelectedPlanData?.monthlyPlanPrice);
      return basePrice; 
    } 
    else 
    {
      basePrice=Number((numberOfMonth  >=12)?this.SelectedPlanData?.yearlyPlanPrice:this.SelectedPlanData?.monthlyPlanPrice);
      return basePrice;
    }
}
}
