import { FC, useState } from 'react'
import eyeShow from '../../icons/eye-show.svg'
import eyeHide from '../../icons/eye-hide.svg'
import { Button } from '../Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import './authScreen.scss'

interface FormValues {
    email: string,
    password: string,
    password2: string,
}
interface RegistrationFormProps {
    onSubmit: (email: string, password: string) => void
}
export const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm<FormValues>()

    const password = watch('password');
    const password2 = watch('password2');

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
                    aria-invalid={errors.password || password !== password2 ? "true" : "false"}
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
            <div className='form__input-wrap'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className='form__input btn'
                    placeholder='Confirm Password'
                    style={{ width: '100%' }}
                    aria-invalid={password !== password2 ? "true" : "false"}
                    {...register("password2", {
                        required: "password  is required",
                        minLength: {
                            value: 6,
                            message: 'Minimum password length is 6'
                        },
                        validate: () => password === password2

                    })}
                />
                <img
                    src={showPassword ? eyeHide : eyeShow}
                    alt="Show password"
                    className='icon'
                    onClick={() => setShowPassword(!showPassword)}
                />
                {password !== password2 && (
                    <p role="alert" className='alert-text'>
                        Passwords do not match
                    </p>
                )}
            </div>
            <Button
                type='submit'
                disabled={false}
                className={'btn'}
            >
                Register
            </Button>
        </form>
    )
}
