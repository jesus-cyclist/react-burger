import React, { useState } from 'react'
import styles from './Register.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { showPassword } from '../../utils/passwordIconClick'
import {
  GET_REGISTER_USER_FAILED,
  GET_REGISTER_USER_REQUEST,
  GET_REGISTER_USER_SUCCESS,
} from '../../services/actions/profileData'
import { useDispatch } from 'react-redux'
import { request } from '../../utils/request'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: 'Semen',
    password: 'qwerty',
    passwordType: 'password',
    email: 'semen@mail.ru',
  })

  const dispatch = useDispatch()

  const registerButtonClickHandler = () => {
    const requestObj = {
      routing: 'auth/register',
      action: {
        failed: GET_REGISTER_USER_FAILED,
        request: GET_REGISTER_USER_REQUEST,
        success: GET_REGISTER_USER_SUCCESS,
      },
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          name: registerData.name,
        }),
      },
    }
    dispatch(request(requestObj))
  }

  const onIconClick = () => showPassword(registerData, setRegisterData)

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Регистрация</h2>
        <div className={styles.nameWrapper}>
          <Input
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            placeholder={'Имя'}
            type={'text'}
          />
        </div>
        <div className={styles.emailWrapper}>
          <Input
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            placeholder={'E-mail'}
            type={'email'}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <Input
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            placeholder={'Пароль'}
            type={registerData.passwordType}
            icon={
              registerData.passwordType === 'password' ? 'ShowIcon' : 'HideIcon'
            }
            onIconClick={onIconClick}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={registerButtonClickHandler}
          >
            Нажми на меня
          </Button>
        </div>

        <div className={styles.loginBlock}>
          <span className={styles.linkHint}>Уже зарегистрированы?</span>
          <Link to={'/login'} className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
