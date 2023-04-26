import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, startWith, switchMap, of   } from 'rxjs';
import { SoftwareList } from 'src/modules/subscription/data/Software';
import { SubscriptionService } from 'src/modules/subscription/services';
import { TenantList } from 'src/modules/tenant/data/Tenant';


@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['softwareId', 'softwareName', 'details', 'accessLink', 'edit'];
  dataSource = new MatTableDataSource<SoftwareList>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  SoftwareList: SoftwareList[] = [];
  SelectedRow:any;
  totalCount:number=0;
  constructor(private subscriptionService: SubscriptionService,public dialog: MatDialog) {}

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
      this.SoftwareList = Data;
      this.dataSource = new MatTableDataSource(this.SoftwareList);
    });
  }
  getTableData$(pageNumber: number, pageSize: number) {
    return this.subscriptionService.GetAllSoftware(pageSize,pageNumber);
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


