import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  SelectedRow:any
  constructor(public subscriptionService: SubscriptionService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllPlan()
  }
  ngAfterViewInit(): void {
 
  }

  GetAllPlan() {
    this.subscriptionService.GetAllPlan().subscribe({
      next: (value: any) => {
        this.PlanList = value.data;
        this.dataSource = value.data;
      },
      complete: () => {},
      error: (value) => {},
    });
  }
  
  selectRow(row :any,index:any){
    console.log("row",row);
    console.log("index",index);
  }


  nextPage(event:any){
    console.log("event nextPage",event);

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
