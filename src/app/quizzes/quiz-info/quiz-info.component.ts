import { Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { QuizViewModel } from '../quiz';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../app-reusables/services/device.service';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';

@Component({
  selector: 'app-quiz-info',
  standalone: true,
  imports: [
    MatProgressBarModule,
    AsyncPipe,
    NgIf,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    InputComponent,
    SelectComponent,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
  ],
  templateUrl: './quiz-info.component.html',
  styleUrl: './quiz-info.component.scss',
})
export class QuizInfoComponent {
  private mainService = inject(QuizService);
  private route = inject(ActivatedRoute);
  private confirm = inject(ConfirmService);
  isHandset$ = inject(DeviceService).isHandset$;
  quizTypes = this.mainService.getTypes();
  quiz!: QuizViewModel;
  frm!: FormGroup;
  questionFrm!: FormGroup;
  imageSource!: string | ArrayBuffer | null;
  loadingQuiz$ = this.mainService.loadingElement$;
  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((param: ParamMap) => {
          if (param.has('id') && !isNaN(+param.get('id')!)) {
            return this.mainService.getById(+param?.get('id')!);
          } else {
            return of(undefined);
          }
        }),
        tap((quiz) => {
          if (quiz) {
            this.quiz = quiz;
          }
          this.frm = this.mainService.createQuizForm(quiz);
          this.questionFrm = this.mainService.createQuizQuestionForm(this.quiz);
          this.imageSource = this.frm.get('imageUrl')?.value;
        })
      )
      .subscribe();
  }
  previewImage(event: any) {
    if (!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSource = reader.result;
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('imageFile')?.setValue(selectedFile);
    this.frm.markAsDirty();
  }
  get questions(): FormArray {
    return this.questionFrm.get('questions') as FormArray;
  }
  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }
  get questionControls(): FormGroup[] {
    return (this.questionFrm.get('questions') as FormArray)
      .controls as FormGroup[];
  }
  getAnswersControls(questionIndex: number): FormGroup[] {
    return (this.questions.at(questionIndex).get('answers') as FormArray)
      .controls as FormGroup[];
  }
  addQuestion() {
    this.questions.push(this.mainService.createQuestionForm());
  }
  addAnswer(i: number) {
    this.getAnswers(i).push(this.mainService.createAnswerForm());
  }
  removeQuestion(i: number) {
    this.confirm
      .open({
        Title: 'Delete Question',
        Message: 'Are you sure you want to delete this question?',
      })
      .pipe(filter((result) => result))
      .subscribe((x) => this.questions.removeAt(i));
  }
  removeAnswer(qI: number, aI: number) {
    this.confirm
      .open({
        Title: 'Delete Answer',
        Message: 'Are you sure you want to delete this answer?',
      })
      .pipe(filter((result) => result))
      .subscribe((x) => this.getAnswers(qI).removeAt(aI));
  }
  submitQuestions() {
    this.confirm
      .open({
        Title: 'Save Questions',
        Message: 'Are you sure you want to save these questions?',
      })
      .pipe(
        filter((result) => result),
        switchMap(x => this.mainService.addQuestionsToQuiz(this.questionFrm.value))
      ).subscribe(x => {
        window.location.reload();
      });
  }
  resetQuestions() {
    this.confirm
      .open({
        Title: 'Reset Questions',
        Message: 'Are you sure you want to reset questions?',
      })
      .pipe(
        filter((result) => result),
        tap(x => window.location.reload())
      ).subscribe()
  }
  submitQuiz() {
    this.confirm
    .open({
      Title: 'Save Questions',
      Message: 'Are you sure you want to save quiz changes',
    })
    .pipe(
      filter((result) => result),
      switchMap(x => this.mainService.editQuiz(this.quiz.quizId,this.frm.value))
    ).subscribe(y => {
      window.location.reload()
    });  
  }
  resetQuiz() {
    this.confirm
      .open({
        Title: 'Reset Questions',
        Message: 'Are you sure you want to reset quiz info?',
      })
      .pipe(
        filter((result) => result),
      ).subscribe(
        x => {
          window.location.reload()
        }
      )
  }
}
