import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from 'src/modules/subscription/services';
import { Option } from 'src/modules/subscription/data/Option';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TenantList } from 'src/modules/tenant/data/Tenant';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'optionName', 'edit'];
  dataSource = new MatTableDataSource<TenantList>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  OtionList: Option[] = [];
  SelectedRow: any;

  constructor(
    public subscriptionService: SubscriptionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllTenant();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetAllTenant() {
    this.subscriptionService.GetAllOption().subscribe({
      next: (value: any) => {
        console.log('this.dataSource', value.data);
        this.OtionList = value.data;
        this.dataSource = value.data;
      },
      complete: () => {},
      error: (value) => {},
    });
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

  nextPage(event: any) {
    console.log('event nextPage', event);
  }
  OpenAddDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '400px',
    });
  }
}
