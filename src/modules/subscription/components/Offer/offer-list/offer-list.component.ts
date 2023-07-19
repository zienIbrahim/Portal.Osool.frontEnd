import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Offer } from 'src/modules/subscription/data/Offer';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit , AfterViewInit{
  displayedColumns: string[] = ['offerId', 'offerName', 'description', 'offerStartDate','offerEndDate', 'yearlyDiscount','monthlyDiscount', 'isActive','edit'];
  dataSource = new MatTableDataSource<Offer>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  OfferList: Offer[] = [];
  SelectedRow: any;
  totalCount:number=0;
  constructor(
    public subscriptionService: SubscriptionService,
    public dialog: MatDialog,
    private router: Router,


  ) {}
  ngOnInit(): void {
    
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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
      this.OfferList = Data;
      this.dataSource = new MatTableDataSource(this.OfferList);
    });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    return this.subscriptionService.GetAllOffer(pageSize,pageNumber);
  }

  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    const dialogRef = this.dialog.open(templateRef, {
      width: '700px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      this.reloadComponent()
    });
  }

  OpenAddDialog(templateRef: any) {
    const dialogRef =  this.dialog.open(templateRef, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      this.reloadComponent()
    });
  }
}
 