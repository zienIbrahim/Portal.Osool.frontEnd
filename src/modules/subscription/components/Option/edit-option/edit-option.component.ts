import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { Option } from 'src/modules/subscription/data/Option';
import { Software } from 'src/modules/subscription/data/Software';
import { SubscriptionService } from 'src/modules/subscription/services';


@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.scss']
})
export class EditOptionComponent implements OnInit{

  Optionform: FormGroup=<FormGroup>{};
  @Input()  OptionData: Option=<Option>{}

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
      optionName: [this.OptionData.optionName, Validators.required],
      id: [this.OptionData.id, Validators.required],
    });
  }

  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Optionform.invalid) {
      return;
    }
    let Data: Option = this.Optionform.value;
    this.subscriptionService.EditOption(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Option added Successfully');
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
