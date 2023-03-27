import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<TenantList>();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  SoftwareList: SoftwareList[] = [];
  SelectedRow:any;

  constructor(private subscriptionService: SubscriptionService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllSoftware();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  GetAllSoftware() {
    this.subscriptionService.GetAllSoftware().subscribe({
      next: (value: any) => {
        this.SoftwareList = value.data;
        this.dataSource = value.data;
      },
      complete: () => {},
      error: (value) => {},
    });
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

  nextPage(event:any){
    console.log("event nextPage",event);

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
