import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface QuizFilterModel extends GeneralFilterModel {
    activeInDate: string | null;
    isActive: boolean | null;
    quizTypeIds: number[] | null;
}



export interface QuizTypeListViewModel {
    quizTypeId: number;
    quizTypeName: string | null;
    name: string | null;
    code: string | null;
}
export interface QuizType {
    quizTypeId: number;
    name: string;
    code: string;
}
export interface QuizBindingModel {
    quizId: number;
    name: string | null;
    description: string | null;
    imageFile: File | null;
    quizTypeId: number;
    prizeMessage: string | null;
    startDate: string;
    endDate: string;
    seconds: number;
    link: string | null;
}

export interface QuizViewModel {
    quizId: number;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    quizTypeId: number;
    quizTypeName: string | null;
    prizeMessage: string | null;
    startDate: string;
    endDate: string;
    seconds: number;
    link: string | null;
    questions: QuizQuestionModel[];
}

export interface QuizListViewModel {
    quizId: number;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    quizTypeId: number;
    quizTypeName: string | null;
    prizeMessage: string | null;
    startDate: string;
    endDate: string;
    seconds: number;
    link: string | null;
    totalUsers: number;
    totalWinners: number;
    totalRefusers: number;
}

export interface AddQuestionssToQuizModel {
    quizId: number;
    questions: QuizQuestionModel[];
}

export interface QuizQuestionModel {
    quizQuestionId: number;
    question: string | null;
    isActive: boolean;
    answers: QuestionAnswerModel[];
}

export interface QuestionAnswerModel {
    questionAnswerId: number;
    answer: string | null;
    isRight: boolean;
    isActive: boolean;
}

export interface UserQuizViewModel {
    userQuizId: number;
    quizId: number;
    userId: string | null;
    quizName: string | null;
    questionCount: number;
    userName: string | null;
    mobileNumber: string | null;
    actionDate: string;
    isRefused: boolean;
    isWon: boolean;
    isCompensated: boolean;
    storeTitle: string | null;
}


export interface ParticipantsFilterModel extends GeneralFilterModel {
    dateFrom: string | null;
    dateTo: string | null;
    quizTypeIds: number[] | null;
    isWon: boolean | null;
    isRefused: boolean | null;
    isCompensated: boolean | null;
}