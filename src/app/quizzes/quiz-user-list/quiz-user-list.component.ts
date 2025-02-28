import { Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { btns, columns, menuBtns, participantsColumns } from '../quiz.const';
import { filter, map, of, switchMap } from 'rxjs';
import {
  DataTableFilter,
  DataTableOutput,
} from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { ParticipantsFilterModel, QuizFilterModel, QuizListViewModel, UserQuizViewModel } from '../quiz';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';

@Component({
  selector: 'app-quiz-user-list',
  standalone: true,
  imports: [MatGridListModule, DataTableComponent, AsyncPipe],
  templateUrl: './quiz-user-list.component.html',
  styleUrl: './quiz-user-list.component.scss',
  providers: [DatePipe]
})
export class QuizUserListComponent extends Unsubscriber {
  private mainService = inject(QuizService);
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  private confirm = inject(ConfirmService);
  loadingMenu$ = this.mainService.loadingCompensation$;
  menuBtns = menuBtns;
  filters: DataTableFilter[] = [
    {
      Type: 'twoDates',
      ControlName: 'dateFrom',
      ControlName2: 'dateTo',
      PlaceHolder: 'Start',
      PlaceHolder2: 'End'
    },
    {
      ControlName: 'quizTypeIds',
      Type: 'select',
      IsMulti: true,
      IsLoading: this.mainService.loadingTypes$,
      DisplayProperty: 'name',
      ValueProperty: 'quizTypeId',
      Data: this.mainService.getTypes(),
      PlaceHolder: 'Select Type',
      UpdateOn: 'blur',
    },
    {
      ControlName: 'isWon',
      Type: 'select',
      DisplayProperty: 'name',
      ValueProperty: 'value',
      Data: of([
        { name: 'Winners', value: true },
        { name: 'Losers', value: false },
      ]),
      PlaceHolder: 'Status',
    },
    {
      ControlName: 'isRefused',
      Type: 'select',
      DisplayProperty: 'name',
      ValueProperty: 'value',
      Data: of([
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ]),
      PlaceHolder: 'Refused?',
    },
    {
      ControlName: 'isCompensated',
      Type: 'select',
      DisplayProperty: 'name',
      ValueProperty: 'value',
      Data: of([
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ]),
      PlaceHolder: 'Compensated?',
    },
  ];
  isLoading$ = this.mainService.loadingList$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
      if (ishandset) {
        return participantsColumns.filter((x) => !x.HideHandset);
      }
      return participantsColumns;
    })
  );
  data: any[] = [];
  dataSize!: number;
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService
      .getParticipants(filter as ParticipantsFilterModel)
      .subscribe((ds) => {
        this.data = ds.data;
        this.dataSize = ds.dataSize;
      });
  }
  buttonClicked(index: number) {
    if (index === 0) {
      this.router.navigateByUrl('/quizzes/add');
    }
  }
  rowClicked(element: QuizListViewModel) {
    this.router.navigateByUrl(`/quizzes/info/${element.quizId}`);
  }

  menuBtnClicked(menuClickObject:{index: number, obj: UserQuizViewModel, objIndex: number}) {
    if(menuClickObject.index == 0) {
          this._otherSubscription = this.confirm.open({Message: 'Are you sure you compensated user: '+ menuClickObject.obj.storeTitle + '?'})
          .pipe(
            filter(result => result),
            switchMap(() => this.mainService.compensate(menuClickObject.obj.userQuizId, menuClickObject.objIndex))
          ).subscribe(result => {
            if(result) {
              this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], isCompensated: true}
              this.data = [...this.data]
            }
          })
        }
  }
}
