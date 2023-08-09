import { useState, useRef } from 'react'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'
import { Modal } from '../Modal/Modal'
import { setAuthorized } from '../../redux/rootSlice'
import { CSSTransition } from 'react-transition-group'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from "firebase/auth"
import { app } from './firebaseConfig'
import { useAppDispatch } from '../../redux/hooks'
import { FirebaseError } from 'firebase/app'
import { RegistrationForm } from './RegistrationForm'
import { LoginForm } from './LoginForm'
import './authScreen.scss'

interface ButtonItem {
  id: number;
  text: string;
}

export const AuthScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const formRef = useRef<HTMLFormElement>(null)

  const [status, setStatus] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [stayLoggined, setStayLoggined] = useState<boolean>(false)


  const buttons: ButtonItem[] = [
    { id: 0, text: 'Registration' },
    { id: 1, text: 'Login' }
  ]

  function registrationHandler(emailValue: string, passwordValue: string) {
    setLoading(true)
    const auth: Auth = getAuth(app)
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        setLoading(false)
        setStatus('User successfully created, now log in')
        setShowModal(true)
        setActiveTab(1)
      })
      .catch((error: FirebaseError) => {
        const errorMessage = error.message
        setStatus(errorMessage)
        setShowModal(true)
        setLoading(false)
      })
  }

  function loginHandler(emailValue: string, passwordValue: string) {
    setLoading(true)
    const auth: Auth = getAuth(app)
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        setLoading(false)
        dispatch(setAuthorized())
        if (stayLoggined) {
          localStorage.setItem('loggined', 'true')
        }
      })
      .catch((error: FirebaseError) => {
        const errorMessage = error.message
        setLoading(false)
        setStatus(errorMessage)
        setShowModal(true)
      })
  }

  return (
    <>
      <header className='header'>
        <Container>
          <div className="header__wrap">
            {buttons.map((item) => {
              return (
                <Button
                  className={`btn ${activeTab === item.id ? 'btn--active' : ''}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    if (formRef.current) {
                      formRef.current.reset()
                    }
                  }}
                >
                  {item.text}
                </Button>
              )
            })}
          </div>
        </Container>
      </header>

      <Container>
        <Title>{activeTab === 0 ? 'Registration' : 'Login'}</Title>
        
        {activeTab === 0
          ?
          <RegistrationForm onSubmit={registrationHandler} />
          :
          <LoginForm onSubmit={loginHandler}>
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={() => setStayLoggined(!stayLoggined)}
              />
              Stay logged in
            </label>
          </LoginForm>
        }
      </Container >

      {loading && <Loader />}

      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={status}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>
    </>
  )
}
