import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../transactions/transaction.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-transaction-add',
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule, MatCardModule,MatProgressSpinnerModule, MatGridListModule, InputComponent, MatButtonModule],
  templateUrl: './transaction-add.component.html',
  styleUrl: './transaction-add.component.scss'
})
export class TransactionAddComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {userId: string, isToUser: boolean}){
    this.frm = this.transactionService.createTransactionForm(data.userId, data.isToUser);
  }
  transactionService = inject(TransactionService);
  loadingAddTransaction$ = this.transactionService.loadingAddTransaction$;
  frm!: FormGroup;
  confirm = inject(ConfirmService);
    private dialogRef = inject(MatDialogRef<TransactionAddComponent>)
  
  submit() {
     if(this.frm.invalid) {
          return;
        }
        this.confirm.open({Title: 'Subscribe', Message:`Are you sure you want to change this add this transaction?`}).pipe(
          filter(result => result),
          switchMap(() => this.transactionService.addTransaction(this.frm.value))
        ).subscribe(x => {
          if(x) {
            this.dialogRef.close(x);
          }
        });
  }
}
