import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/modules/app-common/services/notification.service';
import { AddSoftware } from 'src/modules/subscription/data/Software';
import { SubscriptionService } from 'src/modules/subscription/services';

@Component({
  selector: 'app-create-software',
  templateUrl: './create-software.component.html',
  styleUrls: ['./create-software.component.scss']
})
export class CreateSoftwareComponent implements OnInit {
  Softwareform: FormGroup=<FormGroup>{};

  constructor(private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    this.intiForm()  
  }

  intiForm(){
    
    this.Softwareform = this.formBuilder.group({
      softwareName: [null, Validators.required],
      details: [null, [Validators.required]],
      accessLink: [null, [Validators.required]],
    })
  }

  onSubmit(addTemplateClose:MatIconButton){
    if(this.Softwareform.invalid){
      return
    }
   let Data:AddSoftware=this.Softwareform.value;
   this.subscriptionService.AddSoftware(Data).subscribe({
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
