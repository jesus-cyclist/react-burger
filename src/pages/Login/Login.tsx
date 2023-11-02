import React, { useState, FormEvent } from 'react'
import styles from './Login.module.css'
import { Link, useLocation } from 'react-router-dom'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { registerPath, forgotPasswordPath } from '../../utils/routerPath'
import { useInput } from '../../hooks/useInput'
import { EMAIL, PASSWORD } from '../../constants/inputType/inputType'
import { fetchLogin } from '../../services/reducers/user'
import { TInputType } from '../../utils/types'
import { useAppDispatch } from '../../hooks/hooks'

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
          <div className={styles.buttonWrapper}>
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
