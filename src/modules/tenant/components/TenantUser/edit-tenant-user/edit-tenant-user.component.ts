import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-edit-tenant-user',
  templateUrl: './edit-tenant-user.component.html',
  styleUrls: ['./edit-tenant-user.component.scss']
})
export class EditTenantUserComponent implements OnInit{
  TenantUserform: FormGroup=<FormGroup>{};
  TenantList:TenantList[]=[]
  @Input()  TenantUserId: string='';

  constructor(private formBuilder: FormBuilder,
    public tenantUserService: TenantUserService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.intiForm()  
    this._GetUserTenantById()   
    this._getMAsterData()   
   }
   _GetUserTenantById(){
    if( this.TenantUserId!=''){
      this.tenantUserService.GetUserTenantById(this.TenantUserId).subscribe({
        next: (value: any) => {
        console.log("value -> GetUserTenantById",value)   
     }});
    }
   
   }
intiForm(){
    this.TenantUserform = this.formBuilder.group({
      UserId: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      ConfiremPassword: [null, [Validators.required]],
      tenantList: [null, [Validators.required]],
    });
  }
  onSubmit(addTemplateClose:MatIconButton){
  }
  _getMAsterData(){
    this.tenantUserService.GetAllTenant().subscribe({
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
  get f() {
    return this.TenantUserform.controls
  }
}
