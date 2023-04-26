import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { TenantGroupType } from 'src/modules/tenant/data/TenantGroupType';
import { TenantService } from 'src/modules/tenant/services';

@Component({
  selector: 'app-tenant-group-type-list',
  templateUrl: './tenant-group-type-list.component.html',
  styleUrls: ['./tenant-group-type-list.component.scss']
})
export class TenantGroupTypeListComponent implements OnInit, AfterViewInit {
  constructor(
    public tenantService: TenantService,
    public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'typeName', 'edit'];
  dataSource = new MatTableDataSource<TenantGroupType>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  TenantGroupTypeList: TenantGroupType[] = [];
  SelectedRow: TenantGroupType=<TenantGroupType>{};
  totalCount:number=0;
  ngOnInit(): void {
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
      this.TenantGroupTypeList = Data;
      this.dataSource = new MatTableDataSource(this.TenantGroupTypeList);
    });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    return  this.tenantService.GetAllTenantGroupType(pageSize,pageNumber);
  }
  edit(element :any,templateRef:any){
    console.log("element -> ",element)
    this.SelectedRow=element;
  const dialogRef = this.dialog.open(templateRef,{
    width: '700px', 
    disableClose: true  
  }
    );  
  }

  
  OpenAddDialog(templateRef :any){
    
    this.dialog.open(templateRef,{
      width: '400px'    })
  }

  cancel(templateRef :any): void {
    const dialogRef = this.dialog.open(templateRef)
  //  let dialogRef: MatDialogRef<any>
   dialogRef.close(templateRef);
  }

}
