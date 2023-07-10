import { useAppSelector } from './redux/hooks'
import { StartScreen } from './components/StartScreen/StartScreen'
import { QuizContainer } from './components/QuizContainer/QuizContainer'
import { Loader } from './components/Loader/Loader'
import { AuthScreen } from './components/AuthScreen/AuthScrenn'
import './scss/index.scss';

export const App: React.FC = () => {
  const localLoading = useAppSelector((state) => state.rootSlice.localLoading)
  const quizStarted = useAppSelector((state) => state.rootSlice.quizStarted)
  const isAuthorized = useAppSelector((state) => state.rootSlice.isAuthorized)

  const Quiz = () => {
    if (localLoading) {
      return <Loader />
    }
    if (quizStarted) {
      return <QuizContainer />
    }
    if (!quizStarted) {
      return <StartScreen />
    }
  }

  return (
    <>
      {
        isAuthorized ? <Quiz /> : <AuthScreen />
      }
    </>
  )

}


