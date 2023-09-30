import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { showPassword } from '../../utils/passwordIconClick'
import {
  GET_RESET_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
} from '../../services/actions/userData'
import { useDispatch } from 'react-redux'
import { request } from '../../utils/request'
import { forgotPasswordPath } from '../../utils/routerPath'

function validateInput(arrayOfValue) {
  return arrayOfValue.find((item) => (item.length === 0 ? false : true))
}

const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    password: '',
    passwordType: 'password',
    confirmationCode: '',
  })
  const location = useLocation()

  const dispatch = useDispatch()

  if (!location.state) {
    return <Navigate to={forgotPasswordPath} />
  }

  const onIconClick = () => showPassword(resetData, setResetData)

  const clickHadler = () => {
    const requestObj = {
      routing: 'password-reset',
      action: {
        failed: GET_RESET_PASSWORD_FAILED,
        request: GET_RESET_PASSWORD_REQUEST,
        success: GET_RESET_PASSWORD_SUCCESS,
      },
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: resetData.password,
          token: resetData.confirmationCode,
        }),
      },
    }

    validateInput([resetData.password, resetData.confirmationCode]) &&
      dispatch(request(requestObj))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.passwordWrapper}>
          <Input
            value={resetData.password}
            onChange={(e) =>
              setResetData({ ...resetData, password: e.target.value })
            }
            placeholder={'Введите новый пароль'}
            type={resetData.passwordType}
            icon={
              resetData.passwordType === 'password' ? 'ShowIcon' : 'HideIcon'
            }
            onIconClick={onIconClick}
          />
        </div>
        <div className={styles.confirmationCodeWrapper}>
          <Input
            value={resetData.confirmationCode}
            onChange={(e) =>
              setResetData({ ...resetData, confirmationCode: e.target.value })
            }
            placeholder={'Введите код из письма'}
            type={'text'}
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

export default ResetPassword
