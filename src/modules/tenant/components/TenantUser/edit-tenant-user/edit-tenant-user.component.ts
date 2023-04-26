import { EditUserInGroup } from './../../../data/TenantUser';
import { User } from './../../../../auth/models/auth.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { EditUserRequest, UserData } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';

@Component({
  selector: 'app-edit-tenant-user',
  templateUrl: './edit-tenant-user.component.html',
  styleUrls: ['./edit-tenant-user.component.scss'],
})
export class EditTenantUserComponent implements OnInit {
  TenantUserform: FormGroup = <FormGroup>{};
  TenantList: TenantList[] = [];
  UserData: UserData = <UserData>{};
  @Input() TenantUserId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public tenantUserService: TenantUserService,
    private mastarDataService: MastarDataService,

    public notificationService: NotificationService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.intiForm();
    this._GetUserTenantById();
    this._getMAsterData();
  }

  _GetUserTenantById() {
    this.route.queryParams.subscribe((params) => {
      console.log('userId: %d', params['userId']);
      if (params['userId']) {
          console.log('params : ', params);
          this.TenantUserId = params['userId'];
      }
  });
    if (this.TenantUserId != '') {
      this.tenantUserService.GetUserTenantById(this.TenantUserId).subscribe({
        next: (value: any) => {
          this.UserData = value;
          this._setFormValue();
        },
      });
    }
  }

  intiForm() {
    this.TenantUserform = this.formBuilder.group({
      UserId: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      isActive: [false],
      userInGroups: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.TenantUserform.invalid) {
      console.log("TenantUserform  invalid : ",this.TenantUserform)

      return;
    }
   let EditRequest :EditUserRequest={
    userName:this.TenantUserform.value.userName,
    email:this.TenantUserform.value.email,
    phoneNumber:this.TenantUserform.value.phoneNumber,
    id:this.TenantUserform.value.UserId,
    isActive:this.TenantUserform.value.isActive,
    userInGroups: this.TenantUserform.value.userInGroups.map((element:any) => { return  {
      tenantUserId: element.tenantUserId,
      groupAdmin: element.groupAdmin,
      tenantId: element.tenantId,
      isActive: element.isActive,
    }})
   }
   this.tenantUserService.EditTenantUser(EditRequest).subscribe({
    next: (value: any) => {
    this.notificationService.success("Software added Successfully")
    },
    complete: () => {},
    error: (value) => {
      this.notificationService.error(value.error.ErrorMessage)
    },
  });  }

  _getMAsterData() {
    this.mastarDataService.GetAllTenant().subscribe({
      next: (value: any) => {
        console.log(value);
        this.TenantList = value.data;
      },
      complete: () => {},
      error: (value) => {},
    });
  }
  adduserInGroup(): void {
    this.userInGroupsList.push(
      this.formBuilder.group({
        groupAdmin: ['', Validators.required],
        isActive: [''],
        tenantId: ['', Validators.required],
        tenantUserId: ['', Validators.required],
        timeAdded: [''],
        tenantName: [''],
        databaseName: [''],
        tenantinsertTs: [''],
        tenantGroupTypeId: [''],
        userTenantGroupTypeName: [''],
        timeRemoved: [''],

      })
    );
  }
  
  _setFormValue() {
    this.TenantUserform.patchValue({
      UserId: this.UserData.userId,
      userName: this.UserData.userName,
      email: this.UserData.email,
      phoneNumber: this.UserData.phoneNumber,
    });

    this.UserData.userInGroups.forEach((element, index) => {
      this.adduserInGroup();
      this.userInGroupsList.controls[index].patchValue({
        groupAdmin: element.groupAdmin,
        isActive: element.isActive,
        tenantId: element.tenantId,
        tenantUserId: element.tenantUserId,
        timeAdded: element.timeAdded,
        tenantName: element.userTenant.name,
        databaseName: element.userTenant.databaseName,
        tenantinsertTs: element.userTenant.insertTs,
        tenantGroupTypeId: element.userTenant.tenantGroupTypeId,
        userTenantGroupTypeName: element.userTenant.userTenantGroupType.typeName,
        timeRemoved: element.timeRemoved,
      });
      console.log('🚀  element', element);
    });
  }

 
  removeUser(index: number) {
    const add = this.userInGroupsList;
    if (add.length > 1) add.removeAt(index);
  }

  get f() {
    return this.TenantUserform.controls;
  }
  get userInGroupsList(): FormArray {
    return this.TenantUserform.controls['userInGroups'] as FormArray;
  }
}
