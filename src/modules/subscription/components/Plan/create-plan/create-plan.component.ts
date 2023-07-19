import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  }
  intiForm() {
    this.Planform = this.formBuilder.group({
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
     options: this.formBuilder.array([this.createOptions()]),

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
   // ,options:this.Planform.value.options.map((x:number)=>{return{optionId:x}})
    let Data: AddPlan ={...this.Planform.value} ;
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
