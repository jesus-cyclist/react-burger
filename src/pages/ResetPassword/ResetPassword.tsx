import React, { useEffect, useState, FormEvent } from 'react'
import styles from './ResetPassword.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { forgotPasswordPath } from '../../utils/routerPath'
import { useInput } from '../../hooks/useInput'
import {
  PASSWORD,
  CONFIRMATION_CODE,
} from '../../constants/inputType/inputType'
import { fetchResetPassword } from '../../services/reducers/user'
import { TInputType } from '../../utils/types'

function validateInput(arrayOfValue: string[] | []) {
  const nonValidate = arrayOfValue.filter((item) => item.length === 0)
  return nonValidate.length ? false : true
}

const ResetPassword = (): JSX.Element => {
  const { values, handleChange } = useInput({
    [PASSWORD]: 'qwerty',
    [CONFIRMATION_CODE]: '123345',
  })

  const [passwordType, setPasswordType] = useState<TInputType>(PASSWORD)

  const location = useLocation()

  const dispatch = useDispatch()

  const from = localStorage.getItem('from')
  from ? <Navigate to={forgotPasswordPath} /> : localStorage.removeItem('from')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const requestOptions = {
      body: {
        password: values[PASSWORD],
        token: values[CONFIRMATION_CODE],
      },
    }

    validateInput([values[PASSWORD], values[CONFIRMATION_CODE]]) &&
      //@ts-ignore
      dispatch(fetchResetPassword(requestOptions))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Вход</h2>
          <div className={styles.passwordWrapper}>
            <Input
              value={values[PASSWORD]}
              onChange={handleChange}
              placeholder={'Введите новый пароль'}
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
          <div className={styles.confirmationCodeWrapper}>
            <Input
              value={values[CONFIRMATION_CODE]}
              onChange={handleChange}
              placeholder={'Введите код из письма'}
              type={'text'}
              name={CONFIRMATION_CODE}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </form>
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
