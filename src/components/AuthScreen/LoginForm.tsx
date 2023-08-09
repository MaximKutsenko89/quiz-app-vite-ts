import { FC, useState, ReactNode } from 'react'
import eyeShow from '../../icons/eye-show.svg'
import eyeHide from '../../icons/eye-hide.svg'
import { Button } from '../Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import './authScreen.scss'

interface FormValues {
    email: string,
    password: string,
}
interface LoginFormProps {
    onSubmit: (email: string, password: string) => void,
    children: ReactNode
}
export const LoginForm: FC<LoginFormProps> = ({ onSubmit, children }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>()



    const submitHandler: SubmitHandler<FormValues> = (data) => {
        const { email, password } = data
        onSubmit(email, password)
    }
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className='form' onSubmit={handleSubmit(submitHandler)}>
            <input
                className='form__input btn'
                placeholder='Email'
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                    required: "Email Address is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Incorrect email format'
                    }
                })}
            />
            {errors.email && <p role="alert" className='alert-text'>{errors.email.message as string}</p>}

            <div className='form__input-wrap'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    className='form__input btn'
                    placeholder='Password'
                    style={{ width: '100%' }}
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                        required: "password  is required",
                        minLength: {
                            value: 6,
                            message: 'Minimum password length is 6'
                        }
                    })}
                />
                <img
                    src={showPassword ? eyeHide : eyeShow}
                    alt="Show password"
                    className='icon'
                    onClick={() => setShowPassword(!showPassword)}
                />
                {errors.password && <p role="alert" className='alert-text'>{errors.password.message as string}</p>}
            </div>
                {children}
                <Button
                    type='submit'
                    disabled={false}
                    className={'btn'}
                >
                    Login
                </Button>
        </form>
    )
}
