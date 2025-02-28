import { Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { btns, columns } from '../quiz.const';
import { map, of } from 'rxjs';
import { DataTableFilter, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { QuizFilterModel, QuizListViewModel } from '../quiz';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [MatGridListModule, DataTableComponent, AsyncPipe],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
  providers: [DatePipe]
})
export class QuizListComponent extends Unsubscriber {
  private mainService = inject(QuizService);
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  btns = btns;
  filters: DataTableFilter[] = [
    {
      ControlName: 'quizTypeIds',
      Type: 'select',
      IsMulti: true,
      IsLoading: this.mainService.loadingTypes$,
      DisplayProperty: 'name',
      ValueProperty: 'quizTypeId',
      Data: this.mainService.getTypes(),
      PlaceHolder: 'Select Type',
      UpdateOn: 'blur'
    },
    {
      ControlName: 'isActive',
      Type: 'select',
      DisplayProperty: 'name',
      ValueProperty: 'value',
      Data: of([{name: 'Yes', value: true}, {name: 'No', value: false}]),
      PlaceHolder: 'Active?'
    }
  ]
  isLoading$ = this.mainService.loadingList$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
      if (ishandset) {
        return columns.filter((x) => !x.HideHandset);
      }
      return columns;
    })
  );
  data: any[] = [];
  dataSize!: number;
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService
      .getByFilter(filter as QuizFilterModel)
      .subscribe((ds) => {
        this.data = ds.data;
        this.dataSize = ds.dataSize;
      });
  }
    buttonClicked(index: number) {
      if(index === 0) {
        this.router.navigateByUrl('/quizzes/add')
      }
    }
    rowClicked(element: QuizListViewModel)
    {
      this.router.navigateByUrl(`/quizzes/info/${element.quizId}`);
    }

}
