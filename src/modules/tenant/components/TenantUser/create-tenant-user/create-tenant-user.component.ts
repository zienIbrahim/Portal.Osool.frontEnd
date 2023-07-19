import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { AddTenantUser } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-create-tenant-user',
  templateUrl: './create-tenant-user.component.html',
  styleUrls: ['./create-tenant-user.component.scss']
})
export class CreateTenantUserComponent implements OnInit {
  TenantUserform: FormGroup=<FormGroup>{};
  TenantList:TenantList[]=[]

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
      tenantList: this.formBuilder.array([]),
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
  adduserInGroup(): void {
    this.userInGroupsList.push(
      this.formBuilder.group({
        groupAdmin: ['', Validators.required],
        isPOSUser: [false],
        tenantId: ['', Validators.required],
        tenantUserId: ['', Validators.required],
      })
    );
  }
  removeUser(index: number) {
    const add = this.userInGroupsList;
    if (add.length > 1) add.removeAt(index);
  }
  get f() {
    return this.TenantUserform.controls
  }

  get userInGroupsList(): FormArray {
    return this.TenantUserform.controls['tenantList'] as FormArray;
  }
}
