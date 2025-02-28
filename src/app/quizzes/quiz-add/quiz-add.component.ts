import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, of, tap, filter } from 'rxjs';
import { DeviceService } from '../../app-reusables/services/device.service';
import { QuizViewModel } from '../quiz';
import { QuizService } from '../quiz.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';

@Component({
  selector: 'app-quiz-add',
  standalone: true,
  imports: [MatProgressBarModule, AsyncPipe,
    NgIf,MatGridListModule, ReactiveFormsModule, MatCardModule, InputComponent,
    SelectComponent, MatButtonModule],
  templateUrl: './quiz-add.component.html',
  styleUrl: './quiz-add.component.scss'
})
export class QuizAddComponent {
  private mainService = inject(QuizService);
  private route = inject(ActivatedRoute);
  private confirm = inject(ConfirmService);
  private router = inject(Router);
  isHandset$ = inject(DeviceService).isHandset$;
  quizTypes = this.mainService.getTypes();
  quiz!: QuizViewModel;
  frm!: FormGroup;
  imageSource!: string | ArrayBuffer | null;
  loadingQuiz$ = this.mainService.loadingElement$;
  constructor() {
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        if (param.has('id') && !isNaN(+param.get('id')!)) {
          return this.mainService.getById(+param?.get('id')!);
        } else {
          return of(undefined);
        }
      }),
      tap(quiz => {
        if(quiz) {
          this.quiz = quiz;
        }
        this.frm = this.mainService.createQuizForm(quiz);
        this.imageSource = this.frm.get('imageUrl')?.value;
      }),
    ).subscribe();
  }
  previewImage(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSource = reader.result;      
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('imageFile')?.setValue(selectedFile);
    this.frm.markAsDirty();
  }
  submitQuiz() {
      this.confirm
      .open({
        Title: 'Adding New Quiz',
        Message: 'Are you sure you want to add quiz',
      })
      .pipe(
        filter((result) => result),
        switchMap(x => this.mainService.addQuizBasic(this.frm.value))
      ).subscribe(y => {
        this.router.navigateByUrl(`/quizzes/info/${y.quizId}`)
      });  
    }
}
