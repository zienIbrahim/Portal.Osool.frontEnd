import { Component,OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddTenant, TenantUserList } from 'src/modules/tenant/data/Tenant';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { TenantService } from 'src/modules/tenant/services/tenant.service';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss']
})
export class CreateTenantComponent implements OnInit {
  Tenantform: FormGroup=<FormGroup>{};
  public UsersList: FormArray=<FormArray>{};

  constructor(private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar  ,
    public dialog: MatDialog
    ) { }
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
      users: this.formBuilder.array([this.createUsers()]) 
    })
  }
  createUsers(): FormGroup{
     return this.formBuilder.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      tenantUserId: [null, [Validators.required]],
      admin: [false],  
     });
  }
  addUser() {
    this.UsersList = this.Users;
    this.UsersList.push(this.createUsers());
   }
   // remove User from group
  removeUser(index:number) {
    const add = this.Users;
    if (add.length > 1) add.removeAt(index);
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
  
  onSubmit(){
    console.log("this.Tenantform",this.Tenantform.value)
    if(this.Tenantform.invalid){
      return
    }
   let Data:AddTenant=this.Tenantform.value;
   console.log("this.Tenantform",Data)

   this.tenantService.AddTenant(Data).subscribe({
    next: (value: any) => {
    this.notificationService.success("Software added Successfully")
    },
    complete: () => {},
    error: (value) => {
      this.notificationService.error(value.error.ErrorMessage)
    },
  });
  }
  setAdmin(Rowindex:number){
    if (this.Users.controls.length > 1) {
      this.Users.controls.forEach((item: any,index:number) => {
          item.patchValue({
            admin: index==Rowindex,
          });
      });
     
  }
  }
  OpenAddDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '1000px',
      minHeight:'400px',
      disableClose: false,

    });
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
