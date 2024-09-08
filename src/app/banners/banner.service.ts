import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Banner, BannerBindingModel, BannerFilterModel } from './banner';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { convertJsontoFormData } from '../app-reusables/helpers';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private http = inject(HttpClient);
  private bannerUrl = environment.apiUrl + 'banners';
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingItem = new BehaviorSubject<boolean>(false);
  get loadingItem$(): Observable<boolean> {
    return this.loadingItem.asObservable();
  }
  private loadingAdd = new BehaviorSubject<boolean>(false);
  get loadingAdd$(): Observable<boolean> {
    return this.loadingAdd.asObservable();
  }
  private loadingMenuItems = new BehaviorSubject<number[]>([]);
  get loadingMenuItems$():Observable<number[]> {
    return this.loadingMenuItems.asObservable();
  }

  createBannerForm(banner?: Banner): FormGroup {
    const frm = new FormGroup({
      BannerId: new FormControl(banner?.bannerId ?? 0),
      BannerTitle: new FormControl(banner?.title, Validators.required),
      StartDate: new FormControl(banner?.startDate ?? new Date(), Validators.required),
      ExpiryDate: new FormControl(banner?.expiryDate ?? new Date(2900,0,1), Validators.required),
      IsActive: new FormControl(banner?.isActive ?? false, Validators.required),
      Url: new FormControl(banner?.url ?? "", Validators.required),
      DisplayOrder: new FormControl(banner?.displayOrder, Validators.required),
      ImageUrl: new FormControl(banner?.imageUrl),
      ImageFile: new FormControl(null)
    });
    return frm;
  }

  getBannersByFilter(filter: BannerFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.bannerUrl + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  addUpdateBanner(model: BannerBindingModel): Observable<Banner> {
    this.loadingAdd.next(true);
    const frmData = convertJsontoFormData(model);
    const startDate = typeof model.StartDate === 'string' ? new Date(model.StartDate).toUTCString() : model.StartDate?.toUTCString()!
    const endDate = typeof model.ExpiryDate === 'string' ? new Date(model.ExpiryDate).toUTCString() : model.ExpiryDate?.toUTCString()!
    frmData.append('StartDate', startDate);
    frmData.append('ExpiryDate', endDate);
    return this.http.post<Banner>(this.bannerUrl + '/add', frmData).pipe(
      finalize(() => this.loadingAdd.next(false))
    );

  }
  deleteBanner(id: number, rowIndex: number): Observable<boolean> {
    this.loadingMenuItems.next([...this.loadingMenuItems.value, rowIndex]);
    return this.http.get<boolean>(this.bannerUrl + `/delete?id=${id}`).pipe(
      finalize(() => {
        var i = this.loadingMenuItems.value.indexOf(rowIndex);
        this.loadingMenuItems.value.splice(i,1);
        this.loadingMenuItems.next(this.loadingMenuItems.value);
      })
    )
  }
}
