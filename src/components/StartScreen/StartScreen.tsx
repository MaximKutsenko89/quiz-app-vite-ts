import { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { Title } from '../Title/Title'
import { Container } from '../Container/Container'
import { options } from './options'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  finishLoading,
  startLoading,
  finishLoadingWithError,
  setLogout,
  setQuizOptions,
} from '../../redux/rootSlice'
import { IResult } from '../../redux/types'
import { offlineData } from './offlineData'
import { CSSTransition } from 'react-transition-group'
import './startScreen.scss'
import { QuizOptions } from '../QuizOptions/QuizOptions'


export const StartScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const quizOptions = useAppSelector((state) => state.rootSlice.quizOptions);

  const [valid, setValid] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const URL = `https://opentdb.com/api.php?amount=${quizOptions.amount as string}&category=${quizOptions.category as string}&type=multiple&difficulty=${quizOptions.difficulty as string}`

  async function fetchData() {
    dispatch(startLoading())
    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json() as IResult

      if (data.results.length) {
        dispatch(finishLoading(data.results))
      } else {
        dispatch(finishLoadingWithError(offlineData))
      }
    } catch (e) {
      console.log(e);
      dispatch(finishLoadingWithError(offlineData))
    }
  }

  function validation() {
    let isValid = false
    const optionsValues = Object.values(quizOptions)
    if (optionsValues.length !== Object.values(options).length) {
      isValid = false
    } else {
      isValid = true
    }
    setValid(isValid)
  }
  function changeHandler(field: string, value: string) {
    dispatch(setQuizOptions({
      ...quizOptions,
      [field]: value
    }))
  }

  useEffect(() => {
    validation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizOptions])

  function countHandler() {
    let clickCount = 0
    return function () {
      if (valid) {
        return fetchData()
      } else {
        clickCount++
        if (clickCount === 5) {
          setShowModal(true)
          clickCount = 0
        }
      }
    }
  }
  const clickHandler = countHandler()

  return (
    <Container>
      <Title>Are you ready to start the quiz?</Title>

      <div className='title-wrap'>
        <select name="category"
          className='btn btn--select'
          onChange={(event) => changeHandler(event.target.name, event.target.value)}
          value={quizOptions.category || 'Select Category'}
        >
          <option value="Select Category" disabled>Select Category</option>
          {options.categories.map((item, index) => (
            <option
              value={item.id}
              key={index}
            >
              {item.value}
            </option>
          )
          )}
        </select>

        <select name="amount"
          className='btn btn--select'
          onChange={(event) => changeHandler(event.target.name, event.target.value)}
          value={quizOptions.amount || 'Select the amount of questions'}
        >
          <option value="Select the amount of questions" disabled >Select the amount of questions</option>
          {options.amount.map((item, index) => (
            <option
              value={item}
              key={index}
            >
              {item}
            </option>)
          )}

        </select>

        <select name="difficulty"
          className='btn btn--select'
          onChange={(event) => changeHandler(event.target.name, event.target.value)}
          value={quizOptions.difficulty || 'Select Difficulty'}
        >
          <option value="Select Difficulty" disabled >Select Difficulty</option>
          {options.difficulty.map((item, index) => (
            <option
              value={item.key}
              key={index}
            >
              {item.value}
            </option>
          )
          )}

        </select>
      </div>
      <Button
        className={`btn btn--center ${!valid ? 'btn--disabled' : ''}`}
        onClick={() => clickHandler}
      >
        Get started
      </Button>
      <Button className={'btn btn--modal btn--center'} onClick={() => dispatch(setLogout())}>Logout</Button>
      <QuizOptions cross={true} />

      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={'Select all options!'}
          buttonRequired={false}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>

    </Container >

  )

}
