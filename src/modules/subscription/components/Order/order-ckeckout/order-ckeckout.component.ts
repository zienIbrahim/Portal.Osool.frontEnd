import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { CheckoutData, OrderById } from 'src/modules/subscription/data/Order';
import { PayMethodLst, PayMethod } from 'src/modules/subscription/models/Order';
import { SubscriptionService } from 'src/modules/subscription/services';

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
        public notificationService: NotificationService,

  ) {
  }
  ngOnInit(): void {
    this.intiForm();
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

}
