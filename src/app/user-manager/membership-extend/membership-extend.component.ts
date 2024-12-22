import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembershipService } from '../../memberships/membership.service';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { InputComponent } from '../../app-reusables/controls/input/input.component';

@Component({
  selector: 'app-membership-extend',
  standalone: true,
  imports: [CommonModule, MatCardModule,
    MatButtonModule, ReactiveFormsModule, MatGridListModule, InputComponent, MatProgressSpinnerModule],
  templateUrl: './membership-extend.component.html',
  styleUrl: './membership-extend.component.scss'
})
export class MembershipExtendComponent {
  frm: FormGroup;
  private membershipService = inject(MembershipService);
  private confirm = inject(ConfirmService);
  private dialogRef = inject(MatDialogRef<MembershipExtendComponent>)
  constructor(@Inject(MAT_DIALOG_DATA) public userId: string) {
    this.frm = new FormGroup({
      userId: new FormControl(userId),
      days: new FormControl('', Validators.required)
    });
  }


  loadingAdd$ = this.membershipService.loadingAddToUser$;
  error = '';
  submit() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Title: 'Subscribe', Message:`Are you sure you want to extend this user's membership?`}).pipe(
      filter(result => result),
      switchMap(() => 
        this.membershipService.extendMembershipToUser(this.frm.value.userId, this.frm.value.days)
    ),
    catchError(err => {
      this.error = err.error.message;
      return of(false);
    })
    ).subscribe(x => {
      if(x) {
        this.dialogRef.close(x);
      }
    });
  }
}
