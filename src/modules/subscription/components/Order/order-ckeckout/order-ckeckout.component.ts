import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import AppUtils from 'src/modules/app-common/models/AppUtils';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { CheckoutData, OrderById } from 'src/modules/subscription/data/Order';
import { PayMethodLst, PayMethod } from 'src/modules/subscription/models/Order';
import { SubscriptionService } from 'src/modules/subscription/services';
declare var paylib: any; // Declare $ to use jQuery
@Component({
  selector: 'app-order-ckeckout',
  templateUrl: './order-ckeckout.component.html',
  styleUrls: ['./order-ckeckout.component.scss']
})
export class OrderCkeckoutComponent implements OnInit {
  
  @Input() OrderData: OrderById = <OrderById>{}
  PayMethods: PayMethod[] = PayMethodLst;
  Orderform: FormGroup = <FormGroup>{};
  constructor(private formBuilder: FormBuilder,
        private subscriptionService: SubscriptionService,
        public notificationService: NotificationService) {
    
  }
  ngOnInit(): void {
    this.intiForm();
    var myform=document.getElementById('payform')
    paylib.inlineForm({
      'key': 'CRKM9N-HP2B6H-GQPNDM-Q2BPQN',
      'form': myform,
      'autoSubmit': true,
      'callback': function(response :any) {
       console.log('paylib -> response ->',response);
        if (response.error) {             
          paylib.handleError(document.getElementById('paymentErrors'), response); 
        }
      }
    });
  }
  intiForm() {
    this.Orderform = this.formBuilder.group({
      payMethod: [null, Validators.required],
      paidAmount: [null, Validators.required],
    });
  }

  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Orderform.invalid) {
      console.log("onSubmit -> Orderform -> ",this.Orderform)

      return;
    }
    let Data: CheckoutData = {
      paymentMethod: this.Orderform.value.payMethod,
      paidAmount: this.Orderform.value.paidAmount,
      orderId: this.OrderData.id,
    }
    console.log("Planform -> Data -> ",Data)
    this.subscriptionService.CheckoutOrder(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Checkout Successfully');
        addTemplateClose._elementRef.nativeElement.click();
      },
      complete: () => {},
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      },
    });

  }
  onPaymentSubmit(from: any) {
     console.log('onPaymentSubmit ->',from)
     alert(from)
  }
  fnpaylib(){
    var myform=document.getElementById('payform')
    console.log('paylib ->', paylib);
    // paylib.inlineForm({
    //   'key': 'CRKM9N-HP2B6H-GQPNDM-Q2BPQN',
    //   'form': myform,
    //   'autoSubmit': true,
    //   'callback': function(response :any) {
    //    console.log('response ->',response);
    //     if (response.error) {             
    //       paylib.handleError(document.getElementById('paymentErrors'), response); 
    //     }
    //   }
    // });
  }

}
