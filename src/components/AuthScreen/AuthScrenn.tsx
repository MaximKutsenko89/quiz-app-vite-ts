import { useState, useRef } from 'react'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'
import { Modal } from '../Modal/Modal'
import { setAuthorized } from '../../redux/rootSlice'
import eyeShow from '../../icons/eye-show.svg'
import eyeHide from '../../icons/eye-hide.svg'
import { CSSTransition } from 'react-transition-group'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from "firebase/auth"
import { app } from './firebaseConfig'
import { useAppDispatch } from '../../redux/hooks'
import './authScreen.scss'

interface ButtonItem {
  id: number;
  text: string;
}

export const AuthScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const formRef = useRef<HTMLFormElement>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [status, setStatus] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [stayLoggined, setStayLoggined] = useState<boolean>(false)

  const buttons: ButtonItem[] = [
    { id: 0, text: 'Registration' },
    { id: 1, text: 'Login' }
  ]

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const emailValue = (event.currentTarget.elements[0] as HTMLInputElement).value
    const passwordValue = (event.currentTarget.elements[1] as HTMLInputElement).value
    const confirmPasswordValue = (event.currentTarget.elements[2] as HTMLInputElement).value

    if (passwordValue !== confirmPasswordValue) {
      setStatus('Passwords must match')
    } else {
      setLoading(true)
      const auth: Auth = getAuth(app)
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user
          setLoading(false)
          console.log(user)
          setShowModal(true)
          setActiveTab(1)
          setStatus(null)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
          setStatus(errorMessage)
          setLoading(false)
        })
    }
  }

  function authorizationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const emailValue = (event.currentTarget.elements[0] as HTMLInputElement).value
    const passwordValue = (event.currentTarget.elements[1]as HTMLInputElement).value
    const auth: Auth = getAuth(app)
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user
        setLoading(false)
        console.log(userCredential)
        setStatus('Success')
        dispatch(setAuthorized())
        if (stayLoggined) {
          localStorage.setItem('loggined', 'true')
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setLoading(false)
        setStatus(errorMessage)
        console.log(errorCode)
        console.log(errorMessage)
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
        <form
          ref={formRef}
          className='form'
          onSubmit={activeTab === 0 ? registrationHandler : authorizationHandler}
        >
          <input
            type="email"
            name="email"
            id="email"
            className='form__input btn'
            placeholder='Email'
            required
          />
          <div className='form__input-wrap'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className='form__input btn'
              placeholder='Password'
              style={{ width: '100%' }}
              required
            />
            <img
              src={showPassword ? eyeHide : eyeShow}
              alt="Show password"
              className='icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {activeTab === 0 ? (
            <div className='form__input-wrap'>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                className='form__input btn'
                placeholder='Confirm Password'
                style={{ width: '100%' }}
                required
              />
              <img
                src={showPassword ? eyeHide : eyeShow}
                alt="Show password"
                className='icon'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          ) : null}
          {activeTab === 1 ? (
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={() => setStayLoggined(!stayLoggined)}
              />
              Stay logged in
            </label>
          ) : null}
          <Button
            type='submit'
            disabled={false}
            className={'btn'}
          >
            {activeTab === 0 ? 'Register' : 'Login'}
          </Button>
          {status && <div className="status">{status}</div>}
        </form>
      </Container>
      {loading && <Loader />}
      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={'User successfully created, now log in'}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>
    </>
  )
}
