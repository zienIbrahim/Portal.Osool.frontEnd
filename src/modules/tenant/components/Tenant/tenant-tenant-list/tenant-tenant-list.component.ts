import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TenantList } from '../../../data/Tenant';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-tenant-tenant-list',
  templateUrl: './tenant-tenant-list.component.html',
  styleUrls: ['./tenant-tenant-list.component.scss']
})
export class TenantTenantListComponent implements AfterViewInit,OnInit {
  Tenants:any;
  SelectedRow:any;
  constructor(
    public tenantService: TenantService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetAllTenant()
    
   
  }
  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    const dialogRef = this.dialog.open(templateRef, {
      width: '700px',
      disableClose: true,
    });
  }
  nextPage(event:any){
    console.log("event nextPage",event);

  }

  GetAllTenant(){
    this.tenantService.GetAllTenant().subscribe({
      next:(value:any)=> {
        this.Tenants=value.data
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
      minHeight:'400px'
    });
  }
  selectRow(row :any,index:any){
    console.log("row",row);
    console.log("index",index);

  }
  displayedColumns: string[] = ['id', 'name', 'databaseName', 'edit'];
  dataSource = new MatTableDataSource<TenantList>();

  @ViewChild(MatPaginator) paginator: MatPaginator=<MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
