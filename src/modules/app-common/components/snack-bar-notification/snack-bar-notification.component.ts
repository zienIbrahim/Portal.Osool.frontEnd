import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-snack-bar-notification',
  templateUrl: './snack-bar-notification.component.html',
  styleUrls: ['./snack-bar-notification.component.scss']
})
export class SnackBarNotificationComponent {
  constructor(
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 0,
      panelClass: [className],
      verticalPosition: 'top',
      horizontalPosition:'end'
    });
  }

  showAlert() {
    this.notificationService.alert("an alert", "notice", () => {
      this.notificationService.success("alert oked");
    });
  }

  showConfirm() {
    this.notificationService.confirmation("it will be gone forever", () => {
      this.notificationService.success("confirm oked");
    },
    'Are you sure?',
     () => {
      this.notificationService.error("confirm canceled");
    });
  }
}
