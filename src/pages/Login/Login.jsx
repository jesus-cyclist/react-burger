import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, Navigate } from 'react-router-dom'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { showPassword } from '../../utils/passwordIconClick'
import {
  GET_LOGIN_USER_FAILED,
  GET_LOGIN_USER_REQUEST,
  GET_LOGIN_USER_SUCCESS,
} from '../../services/actions/userData'
import { useDispatch } from 'react-redux'
import { request } from '../../utils/request'
import {
  homePagePath,
  registerPath,
  forgotPasswordPath,
} from '../../utils/routerPath'
import { useAppSelector } from '../../hooks/hooks'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: 'semen@mail.ru',
    password: 'qwerty',
    passwordType: 'password',
  })

  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  const loginButtonClickHandler = () => {
    const requestObj = {
      routing: 'auth/login',
      action: {
        failed: GET_LOGIN_USER_FAILED,
        request: GET_LOGIN_USER_REQUEST,
        success: GET_LOGIN_USER_SUCCESS,
      },
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      },
    }
    dispatch(request(requestObj))
  }

  if (isAuthenticated) return <Navigate to={homePagePath} replace />

  const onIconClick = () => showPassword(loginData, setLoginData)

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.emailWrapper}>
          <Input
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
            placeholder={'E-mail'}
            type={'email'}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <Input
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            placeholder={'Пароль'}
            type={loginData.passwordType}
            icon={
              loginData.passwordType === 'password' ? 'ShowIcon' : 'HideIcon'
            }
            onIconClick={onIconClick}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={loginButtonClickHandler}
          >
            Нажми на меня
          </Button>
        </div>

        <div className={styles.registrationBlock}>
          <span className={styles.linkHint}>Вы — новый пользователь?</span>
          <Link to={registerPath} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.forgotPasswordBlock}>
          <span className={styles.linkHint}>Забыли пароль?</span>
          <Link to={forgotPasswordPath} className={styles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
