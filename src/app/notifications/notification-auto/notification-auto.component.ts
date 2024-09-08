import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { filter, map, switchMap } from 'rxjs';
import { NotificationService } from '../notification.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { routeOptions } from '../notification.const';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { getLocaleDate } from '../../app-reusables/common/date-helper';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-notification-auto',
  standalone: true,
  imports: [MatGridListModule, InputComponent, MatCheckboxModule,
    CommonModule, ReactiveFormsModule, SelectComponent, MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './notification-auto.component.html',
  styleUrl: './notification-auto.component.scss'
})
export class NotificationAutoComponent extends Unsubscriber implements OnInit {
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private deviceService = inject(DeviceService);
  private confirm = inject(ConfirmService);
  private snackBar = inject(MatSnackBar);
  showUsers = false;
  routeOptions = routeOptions;
  isHandset$ = this.deviceService.isHandset$;
  loadingUserList$ = this.notificationService.loadingUserList$;
  loadingSendNotifications$ = this.notificationService.loadingSendNotifications$;
  frm = new FormGroup(
    {
      UserIds: new FormControl<string[]>([], Validators.required),
      Title: new FormControl('', Validators.required),
      Body: new FormControl('', Validators.required),
      Save: new FormControl(true, Validators.required),
      Data: new FormGroup({
        route: new FormControl('/', Validators.required),
        postId: new FormControl(),
        storeId: new FormControl(),
        isMyPost: new FormControl(false),
        date: new FormControl('')
      })
    }
  )
  ngOnInit(): void {
    this._otherSubscription = this.route.queryParamMap.pipe(
      map((qParam: ParamMap) => {return {endPoint: qParam.get('endPoint'),days: qParam.get('days')}}),
      switchMap(data => this.notificationService.getNotificationUsers(data.endPoint!, +data.days!))
    ).subscribe(users => this.frm.get('UserIds')?.setValue(users))
  }
  get dataForm(): FormGroup {
    return this.frm.get('Data') as FormGroup;
  }
  submit() {
    if(this.frm.invalid) {
      return;
    }
    const model: any = Object.assign({}, this.frm.value);
    model.UserIds = this.frm.get('UserIds')?.value;
    model.Data.isMyPost = model.Data.isMyPost ? 'true' : 'false';
    model.Data.date = getLocaleDate(new Date());
    this._otherSubscription = this.confirm.open({Message: `Are you sure you want to send this notification to ${this.frm.get('UserIds')?.value?.length} users ?`}).pipe(
      filter(result => result),
      switchMap(() => {
        return this.notificationService.sendMulticastNotifications(model);
      })
    ).subscribe(x => {
      if(x) {
        if(x > 0) {
          this.snackBar.open('Notification successfully sent to <'+x+'> users','Dismiss', {duration: 10000})
        }
        else {
          this.snackBar.open('Notification not sent','Dismiss', {duration: 10000})
        }
      }
    })
  }
}
