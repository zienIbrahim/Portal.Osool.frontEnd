import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TenantUserList } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-tenant-user-list',
  templateUrl: './tenant-user-list.component.html',
  styleUrls: ['./tenant-user-list.component.scss']
})
export class TenantUserListComponent  implements AfterViewInit,OnInit{
  tenantUser:any;
  SelectedRow:any;
  dataSource = new MatTableDataSource<TenantUserList>();
  displayedColumns: string[] = ['id', 'userName', 'email', 'phoneNumber', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator=<MatPaginator>{};

  constructor(
    public tenantUserService: TenantUserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.GetAllTenantUsers();
  }

  GetAllTenantUsers(){
    this.tenantUserService.GetAllTenantUsers().subscribe({
      next:(value:any)=> {
        this.tenantUser=value.data
        this.dataSource=value.data
      },
      complete:()=> {
          
      },
      error:(value)=> {
          
      },
    }
    ) 
  }
  OpenAddDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '700px',
      minHeight:'400px',
      disableClose: true,

    });
  }

  selectRow(row :any,index:any){
    console.log("row",row);
    console.log("index",index);

  }

  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    // const dialogRef = this.dialog.open(templateRef, {
    //   width: '100%',
    //   minHeight:'400px',
    //   disableClose: true,
    // });
    console.log('element: %d',element);

    this.router.navigate([`/Tenant/TenantUser/Edit`], { queryParams: { userId: this.SelectedRow.id } });
  }

  nextPage(event:any){
    console.log("event nextPage",event);

  }
}
