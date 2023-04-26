import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TenantList } from '../../../data/Tenant';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';
import { startWith, switchMap, catchError, of, map } from 'rxjs';

@Component({
  selector: 'app-tenant-tenant-list',
  templateUrl: './tenant-tenant-list.component.html',
  styleUrls: ['./tenant-tenant-list.component.scss']
})
export class TenantTenantListComponent implements AfterViewInit,OnInit {
  Tenants:TenantList[]=[];
  displayedColumns: string[] = ['id', 'name', 'databaseName', 'edit'];
  dataSource = new MatTableDataSource<TenantList>();
  @ViewChild(MatPaginator) paginator: MatPaginator=<MatPaginator>{};
  SelectedRow:any;
  totalCount:number=0;

  constructor(
    public tenantService: TenantService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    
   
  }


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
      this.Tenants = Data;
      this.dataSource = new MatTableDataSource(this.Tenants);
    });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    return  this.tenantService.GetAllTenant(pageSize,pageNumber);
  }

  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    console.log('element: %d',element);
    this.router.navigate([`/Tenant/Edit`], { queryParams: { tenatId: this.SelectedRow.id } });
  }
 
  OpenAddDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '1000px',
      minHeight:'400px'
    });
  }

  selectRow(row :any,index:any){
    console.log("row",row);
    console.log("index",index);

  }
  

}
