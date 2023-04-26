import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { PlanList } from 'src/modules/subscription/data/Plan';
import { SubscriptionService } from 'src/modules/subscription/services';
import { TenantList } from 'src/modules/tenant/data/Tenant';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'planId', 
    'softwareName',
     'planName',
     'planPrice',
     'isActive',
     'userGroupName',
     'maxUsers',
     'maxBranches',
     'includeUsers',
     'includeBranches',
     'edit'];
  dataSource = new MatTableDataSource<PlanList>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  PlanList: PlanList[] = [];
  SelectedRow:any;
  totalCount:number=0;

  constructor(public subscriptionService: SubscriptionService,public dialog: MatDialog) {}

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
      this.PlanList = Data;
      this.dataSource = new MatTableDataSource(this.PlanList);
    });
  }
  getTableData$(pageNumber: number, pageSize: number) {
    return this.subscriptionService.GetAllPlan(pageSize,pageNumber);
  }


  
  selectRow(row :any,index:any){
    console.log("row",row);
    console.log("index",index);
  }

  OpenAddDialog(templateRef :any){
    
    this.dialog.open(templateRef,{
      width: '600px'    })
  }
  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    const dialogRef = this.dialog.open(templateRef, {
      width: '700px',
      disableClose: true,
    });
  }
}
