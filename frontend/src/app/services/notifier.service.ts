import { AlertComponent } from './../inside/alert/alert.component';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  snackConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    
  };

  constructor(private snackBar: MatSnackBar) {}

  success(msg: string) {
    this.snackConfig.panelClass = ['notification', 'success'];
    this.snackConfig.data = {message: msg, icon: 'fa fa-check-circle'};
    this.snackBar.openFromComponent(AlertComponent, this.snackConfig);
  }

  failure(msg: string) {
    this.snackConfig.panelClass = ['notification', 'failure'];
    this.snackConfig.data = {message: msg, icon: 'fa fa-times-circle'};
    this.snackBar.openFromComponent(AlertComponent, this.snackConfig);
  }
}
