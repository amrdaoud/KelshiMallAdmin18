import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, finalize, Observable, queueScheduler, retry } from 'rxjs';
import { AddQuestionssToQuizModel, ParticipantsFilterModel, QuizBindingModel, QuizFilterModel, QuizType, QuizTypeListViewModel, QuizViewModel } from './quiz';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { HttpClient } from '@angular/common/http';
import { convertJsontoFormData } from '../app-reusables/helpers';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'quiz';
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }

  private loadingElement = new BehaviorSubject<boolean>(false);
  get loadingElement$(): Observable<boolean> {
    return this.loadingElement.asObservable();
  }

  private loadingAddElement = new BehaviorSubject<boolean>(false);
  get loadingAddElement$(): Observable<boolean> {
    return this.loadingAddElement.asObservable();
  }

  private loadingAddQuestions = new BehaviorSubject<boolean>(false);
  get loadingAddQuestions$(): Observable<boolean> {
    return this.loadingAddQuestions.asObservable();
  }

  private loadingTypes = new BehaviorSubject<boolean>(false);
  get loadingTypes$(): Observable<boolean> {
    return this.loadingTypes.asObservable();
  }

  private loadingParticipants = new BehaviorSubject<boolean>(false);
  get loadingParticipants$(): Observable<boolean> {
    return this.loadingParticipants.asObservable();
  }

  private loadingCompensation = new BehaviorSubject<number[]>([]);
  get loadingCompensation$(): Observable<number[]> {
    return this.loadingCompensation.asObservable();
  }

  createQuizForm(quiz?: QuizViewModel):FormGroup {
    let frm = new FormGroup({
     quizId: new FormControl(quiz?.quizId ?? 0),
     name: new FormControl(quiz?.name, Validators.required),
     description: new FormControl(quiz?.description),
     imageFile: new FormControl(null),
     imageUrl: new FormControl(quiz?.imageUrl),
     quizTypeId: new FormControl(quiz?.quizTypeId, Validators.required),
     startDate: new FormControl(quiz?.startDate, Validators.required),
     endDate: new FormControl(quiz?.endDate, Validators.required),
     prizeMessage: new FormControl(quiz?.prizeMessage, Validators.required),
     link: new FormControl(quiz?.link),
     seconds: new FormControl(quiz?.seconds ?? 0),
     introMessage: new FormControl(quiz?.introMessage ?? '', Validators.required)
    });
    return frm;
  }
  createQuizQuestionForm(quiz: QuizViewModel): FormGroup {
    let frm = new FormGroup({
      quizId: new FormControl(quiz.quizId),
      questions: new FormArray(
        quiz.questions.map(q => new FormGroup({
          quizQuestionId: new FormControl(q.quizQuestionId, Validators.required),
          question: new FormControl(q.question, Validators.required),
          isActive: new FormControl(q.isActive, Validators.required),
          answers: new FormArray(
            q.answers.map(a => new FormGroup({
              questionAnswerId: new FormControl(a.questionAnswerId, Validators.required),
              answer: new FormControl(a.answer, Validators.required),
              isRight: new FormControl(a.isRight, Validators.required),
              isActive: new FormControl(a.isActive, Validators.required),

            }))
          )
        }))
      )
    });
    return frm;
  }
  createAnswerForm(): FormGroup {
    return new FormGroup({
      questionAnswerId: new FormControl(0, Validators.required),
      answer: new FormControl("", Validators.required),
      isRight: new FormControl(false, Validators.required),
      isActive: new FormControl(true, Validators.required),
    })
  }

  createQuestionForm(): FormGroup {
    return new FormGroup({
      quizQuestionId: new FormControl(0, Validators.required),
      question: new FormControl("", Validators.required),
      isActive: new FormControl(true, Validators.required),
      answers: new FormArray([this.createAnswerForm()])
    })
  }

  getByFilter(filter: QuizFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter)
    .pipe(
      finalize(() => this.loadingList.next(false))
    );
  }
  getParticipants(filter: ParticipantsFilterModel): Observable<DataWithSize> {
    this.loadingParticipants.next(true);
    return this.http.post<DataWithSize>(this.url + '/participants', filter)
    .pipe(
      finalize(() => this.loadingParticipants.next(false))
    );
  }
  compensate(userQuizId: number, rowIndex: number): Observable<boolean> {
    this.loadingCompensation.next([...this.loadingCompensation.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/compensate?userQuizId=${userQuizId}`).pipe(
      finalize(() => {
        var i = this.loadingCompensation.value.indexOf(rowIndex);
        this.loadingCompensation.value.splice(i,1);
        this.loadingCompensation.next(this.loadingCompensation.value);
      })
    )
  }
  getById(quizId: number): Observable<QuizViewModel> {
    this.loadingElement.next(true);
    return this.http.get<QuizViewModel>(`${this.url}?quizId=${quizId}`)
    .pipe(
      finalize(() => this.loadingElement.next(false))
    );
  }
  addQuizBasic(model: QuizBindingModel): Observable<QuizViewModel> {
    this.loadingAddElement.next(true);
    const frmData = convertJsontoFormData(model);
    return this.http.post<QuizViewModel>(this.url, frmData)
    .pipe(
      finalize(() => this.loadingAddElement.next(false))
    );
  }
  addQuestionsToQuiz(model: AddQuestionssToQuizModel): Observable<QuizViewModel> {
    this.loadingAddQuestions.next(true);
    return this.http.post<QuizViewModel>(this.url + '/questions', model)
    .pipe(
      finalize(() => this.loadingAddQuestions.next(false))
    );
  }
  getTypes(): Observable<QuizType[]> {
    this.loadingTypes.next(true);
    return this.http.get<QuizType[]>(this.url + '/types')
    .pipe(
      finalize(() => this.loadingTypes.next(false))
    );
  }
  editQuiz(quizId: number, model: QuizBindingModel): Observable<QuizViewModel> {
    this.loadingAddElement.next(true);
    const frmData = convertJsontoFormData(model);
    return this.http.post<QuizViewModel>(this.url + `/edit?quizId=${quizId}`, frmData).pipe(
      finalize(() => this.loadingAddElement.next(false))
    )
  }
}
