import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddOffer, Offer } from 'src/modules/subscription/data/Offer';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  Offerform: FormGroup = <FormGroup>{};

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.intiForm();
    }
  intiForm() {
    this.Offerform = this.formBuilder.group({
      offerName: [null, Validators.required],
      description: [null, Validators.required],
      offerStartDate: [null, Validators.required],
      offerEndDate: [null, Validators.required],
      yearlyDiscount: [null, Validators.required],
      monthlyDiscount: [null, Validators.required],
      isActive: [false, Validators.required],
    });
  }
  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Offerform.invalid) {
      return;
    }
    let Data: AddOffer = this.Offerform.value;
    this.subscriptionService.AddOffer(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Offer Updated Successfully');
        addTemplateClose._elementRef.nativeElement.click();
      },
      complete: () => {},
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      },
    });
  }
  get f() {
    return this.Offerform.controls;
  }
}
