import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { OrdersList, OrdersListFilters } from 'src/modules/subscription/data/Order';
import { DDLPlanList } from 'src/modules/subscription/data/Plan';
import { SubscriptionService } from 'src/modules/subscription/services';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { UserList } from 'src/modules/tenant/data/TenantUser';
import { OrderStatusEnum, OrderStatusLst, OrderStatus } from 'src/modules/subscription/models/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements AfterViewInit, OnInit {
  PlanList: DDLPlanList[] = [];
  TenantList: TenantList[] = []
  _userList: UserList[] = [];
  _ordersList: OrdersList[] = [];
  orderStatusList: OrderStatus[] = [];
  dataSource = new MatTableDataSource<OrdersList>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  displayedColumns: string[] = [
    'id',
    'tenantName',
    'validTo',
    'planName',
    'creationDate',
    'totalPrice',
    'discount',
    'userName',
    'status',
    'action'];
  filtersby: OrdersListFilters = { pageNumber: 1, pageSize: 10 };
  SelectedRow: any;
  totalCount: number = 0;
  pageEvent: PageEvent = <PageEvent>{};
  constructor(private mastarDataService: MastarDataService,
    private _subscriptionService: SubscriptionService,
    private router: Router,
    public dialog: MatDialog) {
    this.orderStatusList = OrderStatusLst;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._getMasterTable();
    this.getTableData$();
  }

  _getMasterTable() {
    this.mastarDataService.GetAllPlanList().subscribe({
      next: (value: any) => {
        this.PlanList = value.data;
      }
    });
    this.mastarDataService.GetAllTenant().subscribe({
      next: (value: any) => {
        console.log(value)
        this.TenantList = value.data
      }
    });
    this.mastarDataService.GetAllUsers().subscribe({
      next: (value: any) => {
        this._userList = value.data;
      }
    });
  }

  getTableData$() {
    this._subscriptionService.GetOrdersList(this.filtersby).subscribe((Data: any) => {
      this.dataSource = new MatTableDataSource(Data.data)
      this.totalCount = Data.totalCount;
      this._ordersList = Data.data;
      console.log("this._ordersList :", this._ordersList)
    });;
  }

  onPaginateChange(event: PageEvent) {
    this.filtersby.pageNumber = event.pageIndex + 1;
    this.filtersby.pageSize = event.pageSize;
    this.getTableData$();
  }
  filterQuery() {
    this.filtersby.pageNumber = 1;
    this.getTableData$();
  }
  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    console.log('element: %d', element);
    this.router.navigate([`/Subscription/Order/Edit`], { queryParams: { OrderId: this.SelectedRow.id } });
  }
  view(element: any, templateRef: any) {
    this.SelectedRow = element;
    console.log('element: %d', element);
    this.router.navigate([`Subscription/Order/Details`], { queryParams: { OrderId: this.SelectedRow.id } });
  }
  nextStep() {

  }
  getStatusClass(status: number) {
    switch (status) {
      case OrderStatusEnum.Pending:
       { return 'status-pending'}
      case OrderStatusEnum.PastDue:
        {return 'status-past-due'}
      case OrderStatusEnum.Canceled:
        {return 'status-canceled'}
      case OrderStatusEnum.Completed:
        {return 'status-completed'}
      default: {return 'status-default'}
    }
  }
  getStatusName(status: number) {
    switch (status) {
      case OrderStatusEnum.Pending:
       { return 'pending'}
      case OrderStatusEnum.PastDue:
        {return 'past-due'}
      case OrderStatusEnum.Canceled:
        {return 'canceled'}
      case OrderStatusEnum.Completed:
        {return 'completed'}
      default: {return 'status-default'}
    }
  }

}


