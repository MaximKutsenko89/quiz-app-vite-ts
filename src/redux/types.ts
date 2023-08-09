import {IQuestion} from '../components/StartScreen/offlineData'
export interface IResult {
    results:IQuizList[]
}
export interface IQuizList {
    question: string;
    answers: string[];
    correct_answer: string;
    correctIndex: number;
    activeId?: string | number | undefined;
    incorrect_answers: string;

}
export interface IQuizOptions {
    amount?: string ,
    category?: string ,
    difficulty?: string ,
}
export interface RootState {
    localLoading: boolean;
    quizStarted: boolean;
    quizOptions: IQuizOptions;
    quizList: Array<IQuizList> | Array<IQuestion>;
    count: number;
    analytic: {
        correct: boolean | null,
    }[];
    answersCount: {
        correct: number;
        wrong: number;
    };
    errorMessage: string | null;
    isAuthorized: boolean;
}