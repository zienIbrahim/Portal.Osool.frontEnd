import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddOffer, Offer } from 'src/modules/subscription/data/Offer';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent {
  Offerform: FormGroup = <FormGroup>{};
  @Input()  OfferData: Offer=<Offer>{}

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
      offerId: [this.OfferData.offerId, Validators.required],
      offerName: [this.OfferData.offerName, Validators.required],
      description: [this.OfferData.description, Validators.required],
      offerStartDate: [this.OfferData.offerStartDate, Validators.required],
      offerEndDate: [this.OfferData.offerEndDate, Validators.required],
      yearlyDiscount: [this.OfferData.yearlyDiscount, Validators.required],
      monthlyDiscount: [this.OfferData.monthlyDiscount, Validators.required],
      isActive: [this.OfferData.isActive, Validators.required],
    });
  }
  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Offerform.invalid) {
      return;
    }
    let Data: Offer = this.Offerform.value;
    this.subscriptionService.EditOffer(Data).subscribe({
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
