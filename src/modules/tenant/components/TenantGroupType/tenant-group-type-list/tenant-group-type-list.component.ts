import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  ngOnInit(): void {
    this.GetAllTenantGropType()
  }
  GetAllTenantGropType(){
    this.tenantService.GetAllTenantGroupType().subscribe({
      next:(value:any)=> {
        console.log(value)
        this.TenantGroupTypeList=value.data
        this.dataSource=value.data
      },
      complete:()=> {
          
      },
      error:(value)=> {
          
      },
    }
    ) 
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
