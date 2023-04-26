import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { TenantUserList } from 'src/modules/tenant/data/TenantUser';
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


  displayedColumns: string[] = ['id', 'userName', 'email', 'phoneNumber', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator=<MatPaginator>{};

  constructor(
    public tenantUserService: TenantUserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {    return this.getTableData$(
        this.paginator.pageIndex + 1,
        this.paginator.pageSize
      ).pipe(catchError(() => of(null)));}),
      map((Data :any) => {
        if (Data == null) return [];
        this.totalCount = Data.totalCount;
        return Data.data;
      })
    )
    .subscribe((Data) => {
      this.tenantUser = Data;
      this.dataSource = new MatTableDataSource(this.tenantUser);
    });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    return  this.tenantUserService.GetAllTenantUsers(pageSize,pageNumber);
  }
  ngOnInit(): void {
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
    this.router.navigate([`/Tenant/TenantUser/Edit`], { queryParams: { userId: this.SelectedRow.id } });
  }

}
