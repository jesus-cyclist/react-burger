import React, { useState } from 'react'
import styles from './Register.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { EMAIL, PASSWORD, NAME } from '../../constants/inputType/inputType'
import { fetchRegister } from '../../services/reducers/user'

const Register = () => {
  const { values, handleChange, setValues } = useForm({
    [EMAIL]: 'semen@mail.ru',
    [PASSWORD]: 'qwerty',
    [NAME]: 'Semen',
  })
  const location = useLocation()
  const [passwordType, setPasswordType] = useState(PASSWORD)

  const dispatch = useDispatch()

  const handleSumbit = (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values[EMAIL],
        password: values[PASSWORD],
        name: values[NAME],
      }),
    }

    dispatch(fetchRegister(requestOptions))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSumbit}>
          <h2 className={styles.title}>Регистрация</h2>
          <div className={styles.nameWrapper}>
            <Input
              value={values[NAME]}
              onChange={handleChange}
              placeholder={'Имя'}
              type={'text'}
              name={NAME}
            />
          </div>
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
        <div className={styles.loginBlock}>
          <span className={styles.linkHint}>Уже зарегистрированы?</span>
          <Link
            to={'/login'}
            className={styles.link}
            state={{ from: location }}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
