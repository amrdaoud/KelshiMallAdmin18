import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenerateRedeemModel, RedeemCodeFilterModel, RedeemCodeUsersModel, TransactionBindingModel, TransactionFilterModel, TransactionListViewModel } from './transactions';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'transactions';
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$(): Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }
  private loadingRedeemList = new BehaviorSubject<boolean>(false);
  get loadingRedeemList$(): Observable<boolean> {
    return this.loadingRedeemList.asObservable();
  }
  private loadingRedeemUsers = new BehaviorSubject<boolean>(false);
  get loadingRedeemUsers$(): Observable<boolean> {
    return this.loadingRedeemUsers.asObservable();
  }
  private loadingRedeemListDownload = new BehaviorSubject<boolean>(false);
  get loadingRedeemListDownload$(): Observable<boolean> {
    return this.loadingRedeemListDownload.asObservable();
  }
  private loadingDeactivateRedeem = new BehaviorSubject<boolean>(false);
  get loadingDeactivateRedeem$(): Observable<boolean> {
    return this.loadingDeactivateRedeem.asObservable();
  }
  private loadingGenerateRedeem = new BehaviorSubject<boolean>(false);
  get loadingGenerateRedeem$(): Observable<boolean> {
    return this.loadingGenerateRedeem.asObservable();
  }
  private loadingTransactionRow = new BehaviorSubject<number[]>([]);
  get loadingTransactionRow$(): Observable<number[]> {
    return this.loadingTransactionRow.asObservable();
  }

  private loadingAddTransaction = new BehaviorSubject<boolean>(false);
  get loadingAddTransaction$(): Observable<boolean> {
    return this.loadingAddTransaction.asObservable();
  }

  constructor() { }
  createRedeemForm(): FormGroup {
    let frm = new FormGroup({
      Count: new FormControl('', Validators.required),
      Value: new FormControl('', Validators.required),
      ValidityValue: new FormControl('', Validators.required),
      Note: new FormControl(''),
      JournalDescription: new FormControl(''),
    });
    return frm;
  }
  createTransactionForm(userId: string, isToUser: boolean): FormGroup {
    let frm = new FormGroup({
      userId: new FormControl(userId, Validators.required),
      isToUser: new FormControl(isToUser, Validators.required),
      note: new FormControl(isToUser ? "هدية من كلشي مول" : "استرجاع الى كلشي مول"),
      amount: new FormControl(0, Validators.required),
      description: new FormControl("Added By Admin", Validators.required),
      reference: new FormControl(Date.now().toString(), Validators.required)
    });
    return frm;
  }
  getTransactionsByFilter(filter: TransactionFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportTransactionsByFilter(filter: TransactionFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }


  getRedeemsByFilter(filter: RedeemCodeFilterModel): Observable<DataWithSize> {
    this.loadingRedeemList.next(true);
    return this.http.post<DataWithSize>(this.url + '/redeem/filter', filter).pipe(
      finalize(() => this.loadingRedeemList.next(false))
    )
  }
  exportRedeemsByFilter(filter: RedeemCodeFilterModel): Observable<any> {
    this.loadingRedeemListDownload.next(true);
    return this.http.post(this.url + '/redeem/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingRedeemListDownload.next(false))
    )
  }
  getRedeemUsers(redeemCode: string): Observable<RedeemCodeUsersModel[]> {
    this.loadingRedeemUsers.next(true);
    return this.http.get<RedeemCodeUsersModel[]>(this.url + `/redeem?redeemCode=${redeemCode}`).pipe(
      finalize(() => this.loadingRedeemUsers.next(false))
    )
  }
  deactivateRedeem(redeemCode: string): Observable<boolean> {
    this.loadingDeactivateRedeem.next(true);
    return this.http.get<boolean>(this.url + `/redeem/deactivate?redeemCode=${redeemCode}`).pipe(
      finalize(() => this.loadingDeactivateRedeem.next(false))
    )
  }
  generateRedeem(model: GenerateRedeemModel): Observable<{redeemCode: string}> {
    this.loadingGenerateRedeem.next(true);
    return this.http.post<{redeemCode: string}>(this.url + `/redeem/generate`, model).pipe(
      finalize(() => this.loadingGenerateRedeem.next(false))
    )
  }

  acceptTransaction(journalHeaderId: number, rowIndex: number): Observable<boolean> {
    this.loadingTransactionRow.next([...this.loadingTransactionRow.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/accept?journalHeaderId=${journalHeaderId}`).pipe(
      finalize(() => {
        var i = this.loadingTransactionRow.value.indexOf(rowIndex);
        this.loadingTransactionRow.value.splice(i,1);
        this.loadingTransactionRow.next(this.loadingTransactionRow.value);
      })
    )
  }
  rejectTransaction(journalHeaderId: number, rowIndex: number, statusReason: string): Observable<boolean> {
    this.loadingTransactionRow.next([...this.loadingTransactionRow.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/reject?journalHeaderId=${journalHeaderId}&statusReason=${statusReason}`).pipe(
      finalize(() => {
        var i = this.loadingTransactionRow.value.indexOf(rowIndex);
        this.loadingTransactionRow.value.splice(i,1);
        this.loadingTransactionRow.next(this.loadingTransactionRow.value);
      })
    )
  }
  addTransaction(model: TransactionBindingModel): Observable<TransactionListViewModel> {
    this.loadingAddTransaction.next(true);
    return this.http.post<TransactionListViewModel>(this.url + '/add', model)
    .pipe(
      finalize(() => this.loadingAddTransaction.next(false))
    );
  }
}
