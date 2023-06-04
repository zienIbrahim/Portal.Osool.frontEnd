import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { EditSoftware, Plan, Software } from 'src/modules/subscription/data/Software';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-edit-software',
  templateUrl: './edit-software.component.html',
  styleUrls: ['./edit-software.component.scss']
})
export class EditSoftwareComponent implements OnInit {
  Softwareform: FormGroup=<FormGroup>{};
  @Input()  SoftwareData: Software=<Software>{};
  displayedColumns: string[] = [ 'planId', 
   'planName',
   'planPrice',
   'isActive',
   'maxUsers',
   'maxBranches',
   'includeUsers',
   'includeBranches'];
  dataSource = new MatTableDataSource<Plan>();

  constructor(private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
    ) { 
    }
  ngOnInit(): void {
    this.intiForm()  
    this.getSoftwareById()
  }

intiForm(){
    this.Softwareform = this.formBuilder.group({
      softwareId: [this.SoftwareData.softwareId, Validators.required],
      softwareName: [this.SoftwareData.softwareName, Validators.required],
      details: [this.SoftwareData.details, [Validators.required]],
      accessLink: [this.SoftwareData.accessLink, [Validators.required]],
    })
}

getSoftwareById(){
  this.subscriptionService.GetSoftwareById(this.SoftwareData.softwareId).subscribe({
    next: (value: any) => {
      this.SoftwareData=value
      this.dataSource.data=this.SoftwareData.plans
      console.log("this.SoftwareData",this.SoftwareData)
    },
    complete: () => {},
    error: (value) => {
      this.notificationService.error(value.error.ErrorMessage)
    },
  });
}

onSubmit(addTemplateClose:MatIconButton){
    if(this.Softwareform.invalid){
      return
    }
   let Data:EditSoftware=this.Softwareform.value;
   this.subscriptionService.EditSoftware(Data).subscribe({
    next: (value: any) => {
    this.notificationService.success("Software added Successfully")
    addTemplateClose._elementRef.nativeElement.click()
    },
    complete: () => {},
    error: (value) => {
      this.notificationService.error(value.error.ErrorMessage)
    },
  });
}

  get f() {
    return this.Softwareform.controls
  }

}
