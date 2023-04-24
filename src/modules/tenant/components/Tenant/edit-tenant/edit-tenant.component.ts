import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantDetails } from 'src/modules/tenant/data/Tenant';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
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
  TenantId: string = '';
  TenantDat: TenantDetails=<TenantDetails>{};
  constructor(private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
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
    });
 }

 _getMAsterData(){
  this.tenantService.GetAllTenantGroupType().subscribe({
    next:(value:any)=> {
      console.log(value)
      this.TenantGroupTypeList=value.data
    }
  }
  ) 
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
 onSubmit(){

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
