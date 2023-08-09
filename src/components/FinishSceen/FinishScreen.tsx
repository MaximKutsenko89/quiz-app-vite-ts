import { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Button } from '../Button/Button'
import { Title } from '../Title/Title'
import { CSSTransition } from 'react-transition-group'
import { QuizOptions } from '../QuizOptions/QuizOptions'

import './finishScreen.scss'

export const FinishScreen:React.FC = () => {
  const answersCount = useAppSelector((state) => state.rootSlice.answersCount)
  const quizList = useAppSelector((state) => state.rootSlice.quizList)
  const [showAnswers, setShowAnswers] = useState<boolean>(false)

  function showAnswersHandler() {
    setShowAnswers(true)
  }
  return (
    <>
    <QuizOptions/>
      {!showAnswers &&
        <div>
          <Title>Quiz completed!</Title>
          <div>
            <div className='analytic'>Correct answers: <span style={{ color: 'blue' }}>{answersCount.correct}</span></div>
            <div className='analytic'>Wrong answers: <span style={{ color: '#ff0000' }}>{answersCount.wrong}</span></div>
          </div>
          <Button className={'btn btn--center'}  onClick={showAnswersHandler} >Show answers</Button>
          <Button className={'btn btn--center'}  onClick={() => window.location.reload()}>New quiz</Button>
        </div>}
      <CSSTransition
        in={showAnswers}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <>
          <div className='answers-wrap'>
            {quizList.map((item, index) => {
              const isCorrect = item.correctIndex === item.activeId
              return (
                <div className={`answers ${isCorrect ? 'answers--correct' : 'answers--wrong'}`} key={index}>
                  <div>{index + 1}. {(item.question)}</div>
                  <div>You answered: <span>
                    {item.answers[item.activeId as number]}
                  </span> - <span style={{ color: isCorrect ? '#1149a7' : '#ff0000' }}>{isCorrect ? 'correct' : 'wrong'}</span>
                  </div>
                  {!isCorrect && <div >The correct answer is: <span>{(item.answers[item.correctIndex])}</span></div>}
                </div>
              )
            })}
          </div>
          <Button className={'btn btn--center'} onClick={() => window.location.reload()}>New quiz</Button>
        </>
      </CSSTransition>
    </>
  )
}

