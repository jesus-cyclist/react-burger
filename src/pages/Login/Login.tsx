import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EMAIL, PASSWORD } from '../../constants/inputType/inputType'
import { useAppDispatch } from '../../hooks/hooks'
import { useInput } from '../../hooks/useInput'
import { fetchLogin } from '../../services/reducers/user'
import { forgotPasswordPath, registerPath } from '../../utils/routerPath'
import { TInputType } from '../../utils/types'
import styles from './Login.module.css'

const Login = (): JSX.Element => {
  const [passwordType, setPasswordType] = useState<TInputType>(PASSWORD)
  const location = useLocation()

  const { values, handleChange } = useInput({
    [EMAIL]: 'soulrussianbear@gmail.com',
    [PASSWORD]: 'qwerty',
  })

  const dispatch = useAppDispatch()

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const requestData = {
      body: {
        email: values[EMAIL],
        password: values[PASSWORD],
      },
    }

    dispatch(fetchLogin(requestData))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSumbit}>
          <h2 className={styles.title}>Вход</h2>
          <div className={styles.emailWrapper}>
            <Input
              value={values[EMAIL]}
              onChange={handleChange}
              placeholder={'E-mail'}
              type={'email'}
              name={EMAIL}
            />
          </div>
          <div className={styles.passwordWrapper}>
            <Input
              value={values[PASSWORD]}
              onChange={handleChange}
              placeholder={'Пароль'}
              type={passwordType}
              icon={passwordType === PASSWORD ? 'ShowIcon' : 'HideIcon'}
              onIconClick={() =>
                passwordType === PASSWORD
                  ? setPasswordType('text')
                  : setPasswordType(PASSWORD)
              }
              name={PASSWORD}
            />
          </div>
          <div className={styles.buttonWrapper} data-test-id={'login-button'}>
            <Button htmlType="submit" type="primary" size="medium">
              Нажми на меня
            </Button>
          </div>
        </form>
        <div className={styles.registrationBlock}>
          <span className={styles.linkHint}>Вы — новый пользователь?</span>
          <Link to={registerPath} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.forgotPasswordBlock}>
          <span className={styles.linkHint}>Забыли пароль?</span>
          <Link
            to={forgotPasswordPath}
            className={styles.link}
            state={{ from: location }}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
