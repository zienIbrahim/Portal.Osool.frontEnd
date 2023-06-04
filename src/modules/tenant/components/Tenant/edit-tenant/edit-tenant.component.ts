import { UserInGroup } from './../../../data/Tenant';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { EditTenantRequest, TenantDetails } from 'src/modules/tenant/data/Tenant';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { UserList } from 'src/modules/tenant/data/TenantUser';
import { TenantService } from 'src/modules/tenant/services';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.scss']
})
export class EditTenantComponent implements OnInit{
  Tenantform: FormGroup=<FormGroup>{};
  public UsersList: FormArray=<FormArray>{};
  TenantGroupTypeList: TenantGroupType[] = [];
  _userList: UserList[] = [];
  TenantId: string = '';
  TenantDat: TenantDetails=<TenantDetails>{};
  constructor(private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
    private mastarDataService: MastarDataService,

    private _snackBar: MatSnackBar  ,  
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }


  ngOnInit(): void {
    this.intiForm()
    this._getMAsterData()  
    this._getTenantById()
  }
  intiForm(){
    this.Tenantform = this.formBuilder.group({
      id: [null, [Validators.required]],
      name: this.TenantDat.id,
      databaseName: [null, [Validators.required]],
      insertTs: [null],
      tenantGroupTypeId: [null, [Validators.required]],
      users: this.formBuilder.array([]) 
    })
  }
  createUsers(): FormGroup{
    return this.formBuilder.group({
     userId: [null, [Validators.required]],
     userName: [null, [Validators.required]],
     email: [null, [Validators.required]],
     phoneNumber: [null, [Validators.required]],
     tenantUserId: [null, [Validators.required]],
     tenantId: [null],
     timeRemoved: [null],
     timeAdded: [null],
     groupAdmin: [false],  
     isActive: [false],  
     isPOSUser: [false],  
    });
 }

 _getMAsterData(){
  this.mastarDataService.GetAllTenantGroupType().subscribe({
    next:(value:any)=> {
      this.TenantGroupTypeList=value.data
    }
  });
  this.mastarDataService.GetAllUsers().subscribe({
    next: (value: any) => {
      this._userList = value.data;
    }
  });
}
_getTenantById(){
  this.route.queryParams.subscribe((params) => {
    if (params['tenatId']) {
        this.TenantId = params['tenatId'];
    }
});
  if (this.TenantId != '') {
    this.tenantService.GetTenantById(this.TenantId).subscribe({
      next: (value: any) => {
        this.TenantDat= value;
        console.log("TenantDat :",this.TenantDat)
        this._setFormValue();
      },
    });
  }
}
  _setFormValue(){
    this.Tenantform.patchValue({
      id: this.TenantDat.id,
      name: this.TenantDat.name,
      databaseName: this.TenantDat.databaseName,
      insertTs: this.TenantDat.insertTs,
      tenantGroupTypeId: this.TenantDat.tenantGroupTypeId,
    });
    this.TenantDat.userInGroups.forEach((element, index) => {
      console.log("element: ",element)

      this.addUser();
      this.Users.controls[index].patchValue({
        userId: element.userId,
        userName: element.userName,
        email: element.email,
        phoneNumber: element.phoneNumber,
        tenantUserId: element.tenantUserId,
        tenantId: element.tenantId,
        timeRemoved: element.timeRemoved,
        timeAdded: element.timeAdded,
        groupAdmin: element.groupAdmin,  
        isActive: element.isActive,  
        isPOSUser: element.isPOSUser,  
      });
    })
  }

addUser() {
  this.UsersList = this.Users;
  this.UsersList.push(this.createUsers());
 }
 setAdmin(Rowindex:number){
  if (this.Users.controls.length > 1) {
    this.Users.controls.forEach((item: any,index:number) => {
        item.patchValue({
          groupAdmin: index==Rowindex,
        });
    });
   
}
 }
 onSubmit() {
  if (this.Tenantform.invalid) {

    return;
  }

 let EditRequest :EditTenantRequest={
  id:this.Tenantform.value.id,
  name:this.Tenantform.value.name,
  tenantGroupTypeId:this.Tenantform.value.tenantGroupTypeId,
  databaseName:this.Tenantform.value.databaseName,
  users: this.Tenantform.value.users.map((element:any) => { return  {
    userId: element.userId,
    userName: element.userName,
    email: element.email,
    phoneNumber: element.phoneNumber,
    groupAdmin: element.groupAdmin,
    tenantUserId: element.tenantUserId,
    isActive: element.isActive,
    isPOSUser: element.isPOSUser,  
  }})

 }

 console.log("Tenantform  -> : ",EditRequest)
 console.log("this.Tenantform.value  -> : ",this.Tenantform.value)

 this.tenantService.EditTenant(EditRequest).subscribe({
  next: (value: any) => {
  this.notificationService.success("Software added Successfully")
  },
  complete: () => {},
  error: (value) => {
    this.notificationService.error(value.error.ErrorMessage)
  },
});  }
OpenAddDialog(templateRef: any) {
  this.dialog.open(templateRef, {
    width: '400px',
  });
}
OpenSubscriptionDialog(templateRef: any) {
  this.dialog.open(templateRef, {
    width: '800px',
  });
}

ChangeUser(index:number){
  let userId=this.Users.controls[index].get("userId")?.value
  console.log("ChangeUser \\ userId :",userId)
  if(this.TenantDat.userInGroups.some(x=> x.userId== userId)){
    let element=this.TenantDat.userInGroups.find(x=> x.userId==userId) ??<UserInGroup>{}
    this.Users.controls[index].patchValue({
       userName: element.userName,
       email: element.email,
       phoneNumber: element.phoneNumber,
       tenantId:  element.tenantId,
       timeRemoved:  element.timeRemoved,
       timeAdded:  element.timeAdded,
       groupAdmin:  element.groupAdmin,  
       tenantUserId:  element.tenantUserId,  
       isActive:  element.groupAdmin,  
    });
  }
  else{
    let userData=this._userList.find(x=> x.id==userId) ?? <UserList>{};
    this.Users.controls[index].patchValue({
      userName: userData.userName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      groupAdmin:  false,  
      isActive:  false,  
      tenantId:null,
      timeRemoved:  null,
      timeAdded:null,
      tenantUserId:null,
    });
  }
  
}
removeTenat(index: number) {
  const add = this.Users;
  if (add.length > 1) add.removeAt(index);
}
 get f() {
  return this.Tenantform.controls
 }
 get Users() :FormArray {
  return   this.Tenantform.get('users') as FormArray; 
 }
 get getUsersControls() {
  return (this.Tenantform.get('users') as FormArray).controls;
}

}
