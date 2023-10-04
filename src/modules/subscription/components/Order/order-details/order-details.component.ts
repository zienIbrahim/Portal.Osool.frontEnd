import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { UserRole } from 'src/modules/auth/data/AccessToken';
import { AuthService } from 'src/modules/auth/services';
import { OrderById, OrderDetail, Payment } from 'src/modules/subscription/data/Order';
import { OrderStatusEnum } from 'src/modules/subscription/models/Order';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  order: OrderById = <OrderById>{};
  OrderId: number = 0;
  displayedColumns: string[] = ['optionNameAr', 'optionNameEn', 'optionPrice', 'qty', 'taxAmount'];
  PaymentDisplayedColumns: string[] = ["createdBy", "createdAt", "totalPrice", "status", "payemntType", "transactionId"];

  orderDetailsDataSource = new MatTableDataSource<OrderDetail>();
  PaymentDataSource = new MatTableDataSource<Payment>();
  constructor(private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,

    public dialog: MatDialog,private authService: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getOrederById();
  }
  getOrederById() {
    this.route.queryParams.subscribe((params) => {
      if (params['OrderId']) {
        this.OrderId = params['OrderId'];
      }
    });
    this.subscriptionService.GetOrderById(this.OrderId).subscribe((data: any) => {
      this.order = data;
      // Set the order details data source
      this.orderDetailsDataSource.data = this.order.orderDetails;
      this.PaymentDataSource.data = this.order.payments;
    })
  }

  BackToList() {
   // console.log("havePermission",this.authService.havePermission(UserRole.Admin))
    this.router.navigate([`Subscription/Order`]);
  }
  checkout(templateRef:any){
    const dialogRef = this.dialog.open(templateRef, {
      width: '700px',
      disableClose: true,
    });  
  }
  CanceleOrder(CanceleTemplateRef:any){
    const dialogRef = this.dialog.open(CanceleTemplateRef, {
      width: '700px',
      disableClose: true,
    }); 
  }
  confirmCanceleOrder(CanceleTemplateRef:any){
    this.subscriptionService.CanceleOrder(this.OrderId).subscribe({
      next: (value: any) => {
        this.notificationService.success(' Order Cancled Successfully');
        this.closeModal(CanceleTemplateRef)
      },
      complete: () => {},
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      }
  });
  }
  closeModal(templateClose: MatIconButton){
    templateClose._elementRef.nativeElement.click();
  }
  update() {
    this.router.navigate([`/Subscription/Order/Edit`], { queryParams: { OrderId:this.OrderId} });
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
