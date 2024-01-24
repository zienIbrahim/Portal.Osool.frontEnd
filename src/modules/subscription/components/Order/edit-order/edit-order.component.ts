import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AuthService } from 'src/modules/auth/services';
import { EditOrderDto, OrderById } from 'src/modules/subscription/data/Order';
import { DDLPlanList, Plan, PlanOptions } from 'src/modules/subscription/data/Plan';
import { OrderStatus, OrderStatusEnum, OrderStatusLst } from 'src/modules/subscription/models/Order';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  Subscriptionform: FormGroup=<FormGroup>{};
  OrderDeatilsList: FormArray=<FormArray>{};
  PlanList: DDLPlanList[] = [];
  TotalPrice:number=0;
  checkedAllOption:boolean=false;
  TotalPriceIncludVat:number=0;
  SelectedPlanData: Plan=<Plan>{}
  order: OrderById = <OrderById>{};
  OrderId: number = 0;
  orderStatusList: OrderStatus[] = [];

  constructor(private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private mastarDataService: MastarDataService,
    private route: ActivatedRoute, private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {    this.orderStatusList = OrderStatusLst;
    }
  ngOnInit(): void {
    this.intiForm();
    this._getMasterTable();
    this.getOrederById()

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
      numberOfMonth: [null, Validators.compose([Validators.required,Validators.pattern(/^[0-9]*$/)])],
      status: [{ value: null, disabled: false}, Validators.required],
      checkedAllOption: [true, Validators.required],
      validTo: [{ value: null, disabled: false }, Validators.required],
      orderDetails: this.formBuilder.array([]),
    })
  }
  getOrederById() {
    this.route.queryParams.subscribe((params) => {
      if (params['OrderId']) {
        this.OrderId = params['OrderId'];
      }
    });
    this.subscriptionService.GetOrderById(this.OrderId).subscribe((data: any) => {
      this.order = data;
      // Set the order details data source
      this._setFormValue()
    })
  }
  async _setFormValue(){
    this.Subscriptionform.patchValue({
      tenantId: this.order.tenantId,
      Tenantname: this.order.tenantName,
      currentPlanId: this.order.planId,
      numberOfMonth: this.order.numberOfMonth,
      validTo:this.order.validTo,
      orderId: this.order.id,
      status:this.order.status,
    })
    this.SelectedPlanData= await lastValueFrom(this.subscriptionService.GetPlanById(this.order.planId)) as Plan; 
    this.setPlanDetails()
    this.changeNumberOfMonth();
   
    this.order.orderDetails.forEach((order:any)=> {
    if(this.SelectedPlanData.options.find(x=> x.id==order.optionId)){
        this.getorderDetails.value.forEach((from:any,index:number)=>{
         if(from.optionId==order.optionId) 
          this.getorderDetails.controls[index].patchValue({
            qty:order.qty
          })
                      console.log("status",this.order.status)

        
          
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
    if (this.Subscriptionform.invalid) {
      return;
    }
    let Data: EditOrderDto = {
      oredreId: this.OrderId,
      tenantId: this.Subscriptionform.get('tenantId')?.value,
      planId: this.Subscriptionform.get('currentPlanId')?.value,
      offerId: this.Subscriptionform.get('offerId')?.value,
      numberOfMonth: this.Subscriptionform.get('numberOfMonth')?.value,
      validTo: formatDate(this.Subscriptionform.get('validTo')?.value, 'yyyy-MM-dd', 'en-UM'),
      status:this.Subscriptionform.get('status')?.value,
      orderDetails: this.Subscriptionform.get('orderDetails')?.value.map((item: any) => {
        return {
          optionId: item.optionId,
          qty: item.qty
        }
      })
    };
    this.subscriptionService.EditOrder(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Option Updated Successfully');
        this.router.navigate([`/Subscription/Order`]);
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
    console.log("NumberOfMonth :",NumberOfMonth)
    this.Subscriptionform.get('numberOfMonth')?.setValue(NumberOfMonth)
    this.Subscriptionform.get('numberOfMonth')?.updateValueAndValidity();
    this.calcTotalPrice()
   }

  calcTotalPrice(){
    let numberOfMonth=Number(this.Subscriptionform.value.numberOfMonth);
    let planPrice=Number((numberOfMonth >=12)?this.SelectedPlanData?.yearlyPlanPrice:this.SelectedPlanData?.monthlyPlanPrice);
    const orderDetails= this.getorderDetails.getRawValue();
    let TotalPriceorderDetails:number=0;
    orderDetails.forEach((element:any,index:number)=> {
     if(element.checked) {
      TotalPriceorderDetails +=  Number(element.price *element.qty);
     }
    });
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
  
}
