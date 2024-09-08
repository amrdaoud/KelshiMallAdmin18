import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { AppLogService } from '../app-log.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { appLogConst } from '../app-log.const';
import { map } from 'rxjs';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { AppLogFilterModel } from '../app-log';

@Component({
  selector: 'app-app-log-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './app-log-list.component.html',
  styleUrl: './app-log-list.component.scss',
  providers: [CurrencyPipe, LocaleDatePipe]
})
export class AppLogListComponent extends Unsubscriber {
  private mainService = inject(AppLogService);
  private deviceService = inject(DeviceService);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return appLogConst.columns.filter(x => !x.HideHandset)
        }
        return appLogConst.columns
    })
  );
  data: any[] = [];
  dataSize!: number;
  filters = appLogConst.filters;
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getAppLogByFilter(filter as AppLogFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportAppLogByFilter(filter as AppLogFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('AppLog', `Users-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
}
