import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { AddTenantUser } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-add-new-user-to-tenant',
  templateUrl: './add-new-user-to-tenant.component.html',
  styleUrls: ['./add-new-user-to-tenant.component.scss']
})
export class AddNewUserToTenantComponent implements OnInit {
  TenantUserform: FormGroup=<FormGroup>{};
  TenantList:TenantList[]=[]
  @Input()  TenantId: string=<string>{}
  constructor(private formBuilder: FormBuilder,
    public tenantUserService: TenantUserService,
    private mastarDataService: MastarDataService,

    public notificationService: NotificationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.intiForm()  
      this._getMAsterData()  
  }

  intiForm(){
    this.TenantUserform = this.formBuilder.group({
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      ConfiremPassword: [null, [Validators.required]],
      tenantId: [{value:this.TenantId, disabled: true}, [Validators.required]],
      isPOSUser: [null, [Validators.required]],
      groupAdmin: [null, [Validators.required]],
      tenantUserId: [null, [Validators.required]]
    })
  }

  _getMAsterData(){
    this.mastarDataService.GetAllTenant().subscribe({
      next:(value:any)=> {
        console.log(value)
        this.TenantList=value.data
      },
      complete:()=> {
          
      },
      error:(value)=> {
          
      },
    }
    ) 
  }

  onSubmit(addTemplateClose:MatIconButton){
    if(this.TenantUserform.invalid){
      return
    }
   let Data:AddTenantUser=this.TenantUserform.value;
   Data.tenantList=this.TenantUserform.value.tenantList.map((element:any) => { return  {
    tenantUserId: element.tenantUserId,
    groupAdmin: element.groupAdmin,
    tenantId:this.TenantUserform.value.TenantId,
    isPOSUser: element.isPOSUser,  
  }})
   console.log("this.Tenantform",Data)
   
   this.tenantUserService.AddTenantUser(Data).subscribe({
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
    return this.TenantUserform.controls
  }
  get tenantList() {
    return this.TenantList.filter(x=> this.TenantUserform.get('tenantList')?.value.includes(x.id) );
  }
}
