import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddTenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { TenantService } from 'src/modules/tenant/services';

@Component({
  selector: 'app-add-tenant-group-type',
  templateUrl: './add-tenant-group-type.component.html',
  styleUrls: ['./add-tenant-group-type.component.scss']
})
export class AddTenantGroupTypeComponent implements OnInit  {
  TenantGroupTypeform: FormGroup = <FormGroup>{};

  constructor(
    private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.intiForm()  
  }

  intiForm() {
    this.TenantGroupTypeform = this.formBuilder.group({
      typeName: [null, Validators.required],
    });
  }
  onSubmit(addTemplateClose: MatIconButton) {
    if (this.TenantGroupTypeform.invalid) {
      return;
    }
    let Data: AddTenantGroupType = this.TenantGroupTypeform.value;

    this.tenantService.AddTenantGroupType(Data).subscribe({
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
    return this.TenantGroupTypeform.controls;
  }
}
