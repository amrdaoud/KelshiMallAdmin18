import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../app-reusables/services/device.service';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notification-types',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, RouterLink, MatMenuModule],
  templateUrl: './notification-types.component.html',
  styleUrls: ['./notification-types.component.scss']
})
export class NotificationTypesComponent {
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  isHandset$ = this.deviceService.isHandset$;
  dayOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  goToAutoNotifications(endPoint: string, days: number) {
    this.router.navigate(['/notification-auto'], {queryParams: {endPoint: endPoint, days: days}})
  }
}
