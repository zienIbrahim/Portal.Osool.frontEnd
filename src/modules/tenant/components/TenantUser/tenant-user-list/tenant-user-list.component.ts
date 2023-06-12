import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { TenantUserList, TenantUsersFilters } from 'src/modules/tenant/data/TenantUser';
import { TenantUserService } from 'src/modules/tenant/services/tenant-user.service';

@Component({
  selector: 'app-tenant-user-list',
  templateUrl: './tenant-user-list.component.html',
  styleUrls: ['./tenant-user-list.component.scss']
})
export class TenantUserListComponent  implements AfterViewInit,OnInit{
  tenantUser:TenantUserList[]=[];
  SelectedRow:any;
  dataSource = new MatTableDataSource<TenantUserList>();
  totalCount:number=0;
  filtersby: TenantUsersFilters={PageNumber:1,PageSize:10};
  pageEvent: PageEvent=<PageEvent>{};


  displayedColumns: string[] = ['id', 'userName', 'email', 'phoneNumber', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator=<MatPaginator>{};

  constructor(
    public tenantUserService: TenantUserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
}
  getTableData$() {
    this.tenantUserService.GetAllTenantUsers(this.filtersby).subscribe((Data:any) => {
      this.dataSource=new MatTableDataSource(Data.data)
      this.totalCount=Data.totalCount
    });
  }
  ngOnInit(): void {
    this.getTableData$()

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

  filterQuery() {
    this.filtersby.PageNumber = 1;
    this.getTableData$();
  }

  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    this.router.navigate([`/Tenant/TenantUser/Edit`], { queryParams: { userId: this.SelectedRow.id } });
  }
  onPaginateChange(event: PageEvent) {
    this.filtersby.PageNumber = event.pageIndex +1;
    this.filtersby.PageSize = event.pageSize;
  this.getTableData$();
}

}
