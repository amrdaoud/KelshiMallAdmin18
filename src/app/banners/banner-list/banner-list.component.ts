import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { BannerService } from '../banner.service';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { btns, columns, filters, menuButtons } from '../banner.const';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { Banner, BannerFilterModel } from '../banner';
import { BannerFormComponent } from '../banner-form/banner-form.component';
import { filter, switchMap, tap } from 'rxjs';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';

@Component({
  selector: 'app-banner-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
  providers: [LocaleDatePipe]
})
export class BannerListComponent extends Unsubscriber {
  private mainService = inject(BannerService);
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);
  loadingList$ = this.mainService.loadingList$;
  columnDefs = columns;
  menuButtons = menuButtons;
  btns = btns;
  data: any[] = [];
  dataSize!: number;
  filters = filters;
  lastFilter!: DataTableOutput;
  loadingMenuItems$ = this.mainService.loadingMenuItems$;
  tableChange(filter: DataTableOutput) {
    this.lastFilter = filter;
    this._otherSubscription = this.mainService.getBannersByFilter(filter as BannerFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  tableMenuClicked(menuClickObject:{index: number, obj: Banner, objIndex: number}) {
     if(menuClickObject.index === 0) {
      this._otherSubscription = this.confirm.open({Title:'Delete Banner', Message: 'Are you sure you want to delete this banner?',MatColor: 'warn'}).pipe(
        filter(result => result),
        switchMap(() => this.mainService.deleteBanner(menuClickObject.obj.bannerId, menuClickObject.objIndex)),
        tap(x => {
          if(x) {
            this.tableChange(this.lastFilter)
          }
        }
      )).subscribe();
    }
  }
  buttonClicked(i: number) {
    this._otherSubscription = this.dialog.open(BannerFormComponent, {data: {banner: null}, panelClass: 'form-dialog', disableClose:true})
    .afterClosed()
    .pipe(
      filter(banner => banner),
      switchMap(banner => this.mainService.addUpdateBanner(banner)),
      tap(banner => {
        if(banner) {
          this.tableChange(this.lastFilter)
        }
      })
    ).subscribe();
  }
  rowClicked(item: Banner) {
    this._otherInterval = this.dialog.open(BannerFormComponent, {data: {banner: item}, panelClass: 'form-dialog', disableClose:true})
    .afterClosed()
    .pipe(
      filter(banner => banner),
      switchMap(banner => this.mainService.addUpdateBanner(banner)),
      tap(banner => {
        if(banner) {
          this.tableChange(this.lastFilter)
        }
      })
    ).subscribe();
  }

}
