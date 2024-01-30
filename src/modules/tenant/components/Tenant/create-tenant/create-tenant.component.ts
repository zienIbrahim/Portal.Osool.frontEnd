import { Component,OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
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
  isLoading: Boolean=false;
  public UsersList: FormArray=<FormArray>{};

  constructor(private formBuilder: FormBuilder,
    public tenantService: TenantService,
    public notificationService: NotificationService,
    private mastarDataService: MastarDataService,
    private router: Router,
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
      createNewDatabase: [false, [Validators.required]],        
      users: this.formBuilder.array([this.createUsers()]) 
    })
  }
  createUsers(): FormGroup{
     return this.formBuilder.group({
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      tenantUserId: [null, [Validators.required]],
      admin: [false],  
      isPOSUser: [false],  
     });
  }
  addUser() {
    if(this.createNewDatabase ){
      const add = this.Users;
      if (add.length >= 1)
      return;
    }
    this.UsersList = this.Users;
    this.UsersList.push(this.createUsers());
  }
   // remove User from group
  removeUser(index:number) {
    const add = this.Users;
    if (add.length > 1) add.removeAt(index);
  }

  _getMAsterData(){
    this.mastarDataService.GetAllTenantGroupType().subscribe({
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
  changeCreateNewDatabase(event:any,changeCreateDatabseConfirm:any){
    if(this.createNewDatabase && this.getUsersControls.length>1)
    {
      this.dialog.open(changeCreateDatabseConfirm, {
        disableClose: true,
      });
    }
  }

  CreateDatabseConfirm(Okflag: boolean) {
    if (Okflag) {
      while (this.Users.length > 1) {
        this.Users.removeAt(1); 
      }
    } else {
      this.Tenantform.get('createNewDatabase')?.setValue(false)
    }
    this.dialog.closeAll()
  }

  onSubmit(){
    if(this.Tenantform.invalid){
      return
    }
    this.isLoading=true;
   let Data:AddTenant=this.Tenantform.value;
   this.tenantService.AddTenant(Data).subscribe({
    next: (value: any) => {
      this.isLoading=false;
     this.notificationService.success("Software added Successfully")
     this.router.navigate([`/Tenant/Edit`], { queryParams: { tenatId: value.tenantId } });
    
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
  get createNewDatabase():boolean
  {
    return this.Tenantform.get('createNewDatabase')?.value as boolean;
  }
}
