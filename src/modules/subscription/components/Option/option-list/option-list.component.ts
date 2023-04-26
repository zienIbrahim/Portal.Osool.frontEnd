import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from 'src/modules/subscription/services';
import { Option } from 'src/modules/subscription/data/Option';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { MatDialog } from '@angular/material/dialog';
import { startWith, switchMap, catchError, of, map } from 'rxjs';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'optionName', 'edit'];
  dataSource = new MatTableDataSource<Option>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  OptionList: Option[] = [];
  SelectedRow: any;
  totalCount:number=0;
  constructor(
    public subscriptionService: SubscriptionService,
    public dialog: MatDialog
  ) {}

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
      this.OptionList = Data;
      this.dataSource = new MatTableDataSource(this.OptionList);
    });
  }
  getTableData$(pageNumber: number, pageSize: number) {
    return this.subscriptionService.GetAllOptionList(pageSize,pageNumber);
  }

  selectRow(row: any, index: any) {
    console.log('row', row);
    console.log('index', index);
  }

  edit(element: any, templateRef: any) {
    this.SelectedRow = element;
    const dialogRef = this.dialog.open(templateRef, {
      width: '700px',
      disableClose: true,
    });
  }

  OpenAddDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '400px',
    });
  }
}
