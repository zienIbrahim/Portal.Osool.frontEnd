import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  OptionsList: FormArray=<FormArray>{};

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
     monthlyPlanPrice: [null, Validators.required],
     yearlyPlanPrice: [null, Validators.required],
     isActive: [false, Validators.required],
     userGroupTypeId: [null, Validators.required],
     maxUsers: [null, Validators.required],
     maxBranches: [null, Validators.required],
     includeUsers: [null, Validators.required],
     includeBranches: [null, Validators.required],
     options: this.formBuilder.array([]),

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
  monthlyPlanPrice: this.PlanData.monthlyPlanPrice,
  yearlyPlanPrice: this.PlanData.yearlyPlanPrice,
  isActive: this.PlanData.isActive,
  userGroupTypeId: this.PlanData.userGroupTypeId,
  maxUsers: this.PlanData.maxUsers,
  maxBranches: this.PlanData.maxBranches,
  includeUsers: this.PlanData.includeUsers,
  includeBranches: this.PlanData.includeBranches,
});
this.PlanData.options.forEach((element, index)=>{
  this.addOption()
  this.Options.controls[index].patchValue({
    optionId: element.id,
    price: element.price
  })
})
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
    let Data: Plan ={...this.Planform.value};

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
  createOptions(): FormGroup{
    return this.formBuilder.group({
     optionId: [null, [Validators.required]],
     price: [null, [Validators.required]],
    });
 }

  addOption(){
    this.OptionsList = this.Options;
    this.OptionsList.push(this.createOptions());
  }
  removeOption(index:number){
    const add = this.Options;
    if (add.length > 1) add.removeAt(index);
  }
  get getOptionsControls(){
    return (this.Planform.get('options') as FormArray).controls;
  }
  get Options() :FormArray {
    return   this.Planform.get('options') as FormArray; 
   }
}
