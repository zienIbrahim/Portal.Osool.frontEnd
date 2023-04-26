import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddOption,Option } from 'src/modules/subscription/data/Option';
import { AddPlan } from 'src/modules/subscription/data/Plan';
import { SoftwareList } from 'src/modules/subscription/data/Software';
import { TenantGroupType } from 'src/modules/subscription/data/TenantGroupType';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {
  Planform: FormGroup = <FormGroup>{};
  OtionList: Option[] = [];
  SoftwareList: SoftwareList[] = [];
  TenantGroupTypeList: TenantGroupType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    private mastarDataService: MastarDataService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.intiForm();
    this._getMasterTable();
  }
  intiForm() {
    this.Planform = this.formBuilder.group({
     softwareId: [null, Validators.required],
     planName: [null, Validators.required],
     planPrice: [null, Validators.required],
     isActive: [false, Validators.required],
     userGroupTypeId: [null, Validators.required],
     maxUsers: [null, Validators.required],
     maxBranches: [null, Validators.required],
     includeUsers: [null, Validators.required],
     includeBranches: [null, Validators.required],
     options: [null, Validators.required],

    });
  }
  _getMasterTable(){
    this.mastarDataService.GetAllOption().subscribe({
      next: (value: any) => {
        this.OtionList = value.data;
      }});
      this.mastarDataService.GetAllSoftware().subscribe({
        next: (value: any) => {
          this.SoftwareList = value.data;
        }});
      this.mastarDataService.GetAllTenantGroupType().subscribe({
        next: (value: any) => {
          this.TenantGroupTypeList = value.data;
        }});
        }

  onSubmit(addTemplateClose: MatIconButton) {
    if (this.Planform.invalid) {
      return;
    }
    let Data: AddPlan ={...this.Planform.value,options:this.Planform.value.options.map((x:number)=>{return{optionId:x}})} ;

    console.log("Planform -> Data -> ",Data)
    this.subscriptionService.AddPlan(Data).subscribe({
      next: (value: any) => {
        this.notificationService.success('Option Updated Successfully');
        addTemplateClose._elementRef.nativeElement.click();
      },
      complete: () => {},
      error: (value) => {
        this.notificationService.error(value.error.ErrorMessage);
      },
    });
  }

  get f() {
    return this.Planform.controls;
  }
}
