import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TenantFilters, TenantList } from '../../../data/Tenant';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
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
  pageEvent: PageEvent=<PageEvent>{};
  filtersby: TenantFilters={pageNumber:1,pageSize:10};
  constructor(
    public tenantService: TenantService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getTableData$()
   
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTableData$() {
    this.tenantService.GetAllTenant(this.filtersby).subscribe((Data:any) => {
      this.dataSource=new MatTableDataSource(Data.data)
      this.totalCount=Data.totalCount
    });;
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
    onPaginateChange(event: PageEvent) {
      this.filtersby.pageNumber = event.pageIndex +1;
      this.filtersby.pageSize = event.pageSize;
    this.getTableData$();
  }
  filterQuery() {
  this.filtersby.pageNumber = 1;
  
  this.getTableData$();

  }

}
