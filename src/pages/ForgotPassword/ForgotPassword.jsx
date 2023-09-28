import React, { useState } from 'react'
import styles from './ForgotPassword.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from 'react-router-dom'
import { request } from '../../utils/request'
import {
  GET_FORGOT_PASSWORD_FAILED,
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
} from '../../services/actions/userData'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/hooks'
import { homePagePath } from '../../utils/routerPath'

function validateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    ? true
    : false
}

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('mama@mail.ru')
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  const clickHadler = () => {
    const requestObj = {
      routing: 'password-reset',
      action: {
        failed: GET_FORGOT_PASSWORD_FAILED,
        request: GET_FORGOT_PASSWORD_REQUEST,
        success: GET_FORGOT_PASSWORD_SUCCESS,
      },
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
      },
    }

    validateEmail(emailValue) && dispatch(request(requestObj))
  }

  if (isAuthenticated) return <Navigate to={homePagePath} replace />

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.emailWrapper}>
          <Input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder={'E-mail'}
            type={'email'}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={clickHadler}
          >
            Восстановить
          </Button>
        </div>

        <div className={styles.loginBlock}>
          <span className={styles.linkHint}>Вспомнили пароль?</span>
          <Link to={'/login'} className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
