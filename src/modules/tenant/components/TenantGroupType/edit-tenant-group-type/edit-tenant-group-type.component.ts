import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { TenantService } from 'src/modules/tenant/services';

@Component({
  selector: 'app-edit-tenant-group-type',
  templateUrl: './edit-tenant-group-type.component.html',
  styleUrls: ['./edit-tenant-group-type.component.scss']
})
export class EditTenantGroupTypeComponent {
  @Input()  TenantGroupData: TenantGroupType=<TenantGroupType>{}
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
      typeName: [this.TenantGroupData.typeName, Validators.required],
      id: [this.TenantGroupData.id, Validators.required],
    });
  }
  onSubmit(addTemplateClose: MatIconButton) {
    if (this.TenantGroupTypeform.invalid) {
      return;
    }
    let Data: TenantGroupType = this.TenantGroupTypeform.value;

    this.tenantService.EditTenantGroupType(Data).subscribe({
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
