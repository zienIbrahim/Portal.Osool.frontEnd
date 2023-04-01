import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { SubscriptionService } from 'src/modules/subscription/services';
import { AddTenant } from 'src/modules/tenant/data/Tenant';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { TenantService } from 'src/modules/tenant/services/tenant.service';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss']
})
export class CreateTenantComponent implements OnInit {
  Tenantform: FormGroup=<FormGroup>{};

  constructor(private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar    ) { }
    TenantGroupTypeList: TenantGroupType[] = [];

    ngOnInit(): void {
      this.intiForm()  
      this._getMAsterData()  
    }

  intiForm(){
    this.Tenantform = this.formBuilder.group({
      name: [null, Validators.required],
      databaseName: [null, [Validators.required]],
      tenantGroupTypeId: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      ConfiremPassword: [null, [Validators.required]],
    })
  }
  _getMAsterData(){
    this.tenantService.GetAllTenantGroupType().subscribe({
      next:(value:any)=> {
        console.log(value)
        this.TenantGroupTypeList=value.data
      },
      complete:()=> {
          
      },
      error:(value)=> {
          
      },
    }
    ) 
  }
  onSubmit(addTemplateClose:MatIconButton){
    if(this.Tenantform.invalid){
      return
    }
   let Data:AddTenant=this.Tenantform.value;
   console.log("this.Tenantform",Data)

   this.tenantService.AddTenant(Data).subscribe({
    next: (value: any) => {
    this.notificationService.success("Software added Successfully")
    addTemplateClose._elementRef.nativeElement.click()
    },
    complete: () => {},
    error: (value) => {
      this.notificationService.error(value.error.ErrorMessage)
    },
  });
  }

  get f() {
    return this.Tenantform.controls
  }


}
