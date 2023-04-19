import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { UserData } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-edit-tenant-user',
  templateUrl: './edit-tenant-user.component.html',
  styleUrls: ['./edit-tenant-user.component.scss']
})
export class EditTenantUserComponent implements OnInit{
  TenantUserform: FormGroup=<FormGroup>{};
  TenantList:TenantList[]=[]
  UserData:UserData=<UserData>{};
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
          this.UserData=value
          this._setFormValue()   
     }});
    }
   
   }

  intiForm(){
    this.TenantUserform = this.formBuilder.group({
      UserId: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      tenantList: [null, [Validators.required]],
      isActive: [false, [Validators.required]],
      userInGroups: this.formBuilder.array([]),

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
  adduserInGroup(): void {
    this.userInGroupsList.push(
      this.formBuilder.group({
        groupAdmin:['', Validators.required],
        isActive:['', Validators.required],
        tenantId:['', Validators.required],
        tenantUserId:['', Validators.required],
        timeAdded:['', Validators.required],
        tenantName:['', Validators.required],
        databaseName:['', Validators.required],
        tenantinsertTs:['', Validators.required],
        tenantGroupType:['', Validators.required],
        tenantGroupTypeId:['', Validators.required],
        tenantGroupTypeName:['', Validators.required],
        timeRemoved:['', Validators.required]
      })
    );
  }
  _setFormValue(){
    this.TenantUserform.patchValue({
      UserId: this.UserData.userId,
      userName: this.UserData.userName,
      email: this.UserData.email,
      phoneNumber: this.UserData.phoneNumber,
    });

    this.UserData.userInGroups.forEach((element, index) => {
      this.adduserInGroup()
      this.userInGroupsList.controls[index].patchValue({


      });

      console.log("🚀  element", element)

    });
      }

  get f() {
    return this.TenantUserform.controls
  }
  get userInGroupsList(): FormArray {
    return this.TenantUserform.controls['userInGroups'] as FormArray;
}


}
