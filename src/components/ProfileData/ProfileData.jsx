import React, { useEffect, useRef, useState } from 'react'
import styles from './ProfileData.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../hooks/hooks'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { accessToken } from '../../utils/token'
import { useForm } from '../../hooks/useForm'
import { EMAIL, PASSWORD, NAME } from '../../constants/inputType/inputType'
import {
  fetchUserData,
  fetchUpdateUserData,
} from '../../services/reducers/user'

const ProfileData = () => {
  const { values, handleChange, setValues } = useForm({
    [EMAIL]: '',
    [PASSWORD]: '',
    [NAME]: '',
  })

  const nameRef = useRef(null)
  const loginRef = useRef(null)
  const passwordRef = useRef(null)

  const [editInput, setEditInput] = useState(null)

  const response = useAppSelector(
    (state) => state.rootReducer.user.userData.data
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get(accessToken)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    dispatch(fetchUserData(requestOptions))
  }, [])

  useEffect(() => {
    response &&
      setValues({
        ...values,
        [EMAIL]: response.email,
        [NAME]: response.name,
      })
  }, [response])

  useEffect(() => {
    function escapeHandler(event) {
      setEditInput(null)
    }

    document.addEventListener('click', escapeHandler)
    return () => {
      document.removeEventListener('click', escapeHandler)
    }
  }, [])

  function onIconClick(inputType, ref) {
    setEditInput(inputType)
    setTimeout(() => ref.current.focus(), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (response.name !== values[NAME] || response.email !== values[EMAIL]) {
      const token = Cookies.get(accessToken)
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          email: values[EMAIL],
          name: values[NAME],
        }),
      }
      dispatch(fetchUpdateUserData(requestOptions))
    } else {
      alert('ничего не поменял')
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <div className={styles.nameWrapper}>
          <Input
            ref={nameRef}
            value={values[NAME]}
            onChange={handleChange}
            onIconClick={(e) => onIconClick('name', nameRef)}
            placeholder={'Имя'}
            type={'text'}
            icon={'EditIcon'}
            disabled={editInput === 'name' ? false : true}
            name={NAME}
          />
        </div>
        <div className={styles.loginWrapper}>
          <Input
            ref={loginRef}
            value={values[EMAIL]}
            onChange={handleChange}
            onIconClick={() => onIconClick('login', loginRef)}
            placeholder={'Логин'}
            type={'text'}
            icon={'EditIcon'}
            disabled={editInput === 'login' ? false : true}
            name={EMAIL}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <Input
            ref={passwordRef}
            value={values[PASSWORD]}
            onChange={handleChange}
            onIconClick={() => onIconClick('password', passwordRef)}
            placeholder={'Пароль'}
            type={editInput === 'password' ? 'text' : 'password'}
            icon={'EditIcon'}
            disabled={editInput === 'password' ? false : true}
            name={PASSWORD}
          />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </form>
    </main>
  )
}

export default ProfileData
