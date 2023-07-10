import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IQuizList {
  question: string;
  answers: string[];
  correct_answer: string;
  correctIndex: number;
  activeId?: string | number;
  incorrect_answers: string;
}
interface IQuizOptions {
  amount?: string,
  category?: string,
  difficulty?: string
}
interface RootState {
  localLoading: boolean;
  quizStarted: boolean;
  quizOptions: IQuizOptions;
  quizList: IQuizList[];
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

const initialState: RootState = {
  localLoading: false,
  quizStarted: false,
  quizOptions: {},
  quizList: [],
  count: 0,
  analytic: [],
  answersCount: { correct: 0, wrong: 0 },
  errorMessage: null,
  isAuthorized: false || !!localStorage.getItem('loggined'),
};

export const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.localLoading = true;
    },
    finishLoading: (state, action: PayloadAction<IQuizList[]>) => {
      state.localLoading = false;
      state.quizStarted = true;
      state.quizList = action.payload.map((item, index) => {
        const incorrectAnswers: string = item.incorrect_answers;
        const correctAnswer = item.correct_answer;
        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));

        const newArray = [
          ...incorrectAnswers.slice(0, randomIndex),
          correctAnswer,
          ...incorrectAnswers.slice(randomIndex)
        ];
        return {
          question: item.question,
          answers: newArray,
          correct_answer: item.correct_answer,
          correctIndex: newArray.indexOf(item.correct_answer),
        };
      });
      state.analytic = state.quizList.map(() => ({ correct: null }));
    },
    setQuizOptions: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.quizOptions = action.payload;
    },
    finishLoadingWithError: (state, action: PayloadAction<IQuizList[]>) => {
      state.localLoading = false;
      state.quizList = action.payload;
      state.quizStarted = true;
      state.analytic = state.quizList.map(() => ({ correct: null }));
      state.errorMessage = 'Failed to connect to the server, using local quiz';
    },
    updateCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    setAnalytic: (state, action: PayloadAction<{ correct: boolean | null; activeId: string | number }>) => {
      const { correct, activeId } = action.payload;
      state.analytic[state.count].correct = correct;
      state.quizList[state.count].activeId = activeId;
    },
    setAnswersCount: (state, action: PayloadAction<{ correct: boolean }[]>) => {
      state.answersCount = action.payload.reduce(
        (accum, elem) => {
          if (elem.correct) {
            accum.correct += 1;
          } else {
            accum.wrong += 1;
          }
          return accum;
        },
        {
          correct: 0,
          wrong: 0,
        }
      );
    },
    setAuthorized: (state) => {
      state.isAuthorized = true;
    },
    setLogout: (state) => {
      state.isAuthorized = false;
      localStorage.removeItem('loggined');
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoading,
  finishLoading,
  setQuizOptions,
  finishLoadingWithError,
  updateCount,
  setAnalytic,
  setAnswersCount,
  setAuthorized,
  setLogout,
} = rootSlice.actions;

export default rootSlice.reducer;
