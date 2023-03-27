import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { SubscriptionService } from 'src/modules/subscription/services';
import { Option,AddOption } from 'src/modules/subscription/data/Option';

@Component({
  selector: 'app-create-option',
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.scss'],
})
export class CreateOptionComponent implements OnInit {
  Optionform: FormGroup = <FormGroup>{};

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
    this.Optionform = this.formBuilder.group({
      optionName: [null, Validators.required],
    });
  }

  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Optionform.invalid) {
      return;
    }
    let Data: AddOption = this.Optionform.value;
    this.subscriptionService.AddOtion(Data).subscribe({
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

  get f() {
    return this.Optionform.controls;
  }
}
