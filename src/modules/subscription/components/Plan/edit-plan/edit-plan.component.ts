import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddPlan, Plan } from 'src/modules/subscription/data/Plan';
import { SoftwareList } from 'src/modules/subscription/data/Software';
import { Option } from 'src/modules/subscription/data/Option';
import { TenantGroupType } from 'src/modules/subscription/data/TenantGroupType';
import { SubscriptionService } from 'src/modules/subscription/services';
import { MastarDataService } from 'src/modules/app-common/services/mastar-data.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent {
  @Input()  PlanData: Plan=<Plan>{}
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
    this._getPlanById();
  }
  intiForm() {
    this.Planform = this.formBuilder.group({
     planId: [null],
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
  _getPlanById(){
    this.subscriptionService.GetPlanById(this.PlanData.planId).subscribe({
      next: (value: any) => {
        this.PlanData = value;
        this._setFormValue()
      }});
  }
  _setFormValue(){
this.Planform.patchValue({
  planId: this.PlanData.planId,
  softwareId: this.PlanData.softwareId,
  planName: this.PlanData.planName,
  planPrice: this.PlanData.planPrice,
  isActive: this.PlanData.isActive,
  userGroupTypeId: this.PlanData.userGroupTypeId,
  maxUsers: this.PlanData.maxUsers,
  maxBranches: this.PlanData.maxBranches,
  includeUsers: this.PlanData.includeUsers,
  includeBranches: this.PlanData.includeBranches,
  options: this.PlanData.options.map(x=> {return x.id}),
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
    let Data: Plan ={...this.Planform.value,options:this.Planform.value.options.map((x:number)=>{return{optionId:x}})} ;

    console.log("Planform -> Data -> ",Data)
    this.subscriptionService.EditPlan(Data).subscribe({
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
