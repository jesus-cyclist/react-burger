import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './ProfileData.module.css'
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../hooks/hooks'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { accessToken } from '../../utils/token'
import { useInput } from '../../hooks/useInput'
import { EMAIL, PASSWORD, NAME } from '../../constants/inputType/inputType'
import {
  fetchUserData,
  fetchUpdateUserData,
} from '../../services/reducers/user'
import { TUserData } from '../../utils/types'
import { selectResponse } from '../../services/selectors/userSelectors'

type TInputType = null | HTMLInputElement

const ProfileData = (): JSX.Element => {
  const { values, handleChange, setValues } = useInput({
    [EMAIL]: '',
    [PASSWORD]: '',
    [NAME]: '',
  })

  const nameRef = useRef<TInputType>(null)
  const loginRef = useRef<TInputType>(null)
  const passwordRef = useRef<TInputType>(null)

  const [editInput, setEditInput] = useState<string | null>(null)

  const response = useSelector(selectResponse)

  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get(accessToken)
    const requestOptions = {
      token: { accessToken: token },
    }
    //@ts-ignore
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
    function escapeHandler(event: MouseEvent) {
      setEditInput(null)
    }

    document.addEventListener('click', escapeHandler)
    return () => {
      document.removeEventListener('click', escapeHandler)
    }
  }, [])

  function onIconClick(inputType: string, ref: { current: TInputType }) {
    if (ref.current) {
      setEditInput(inputType)
      setTimeout(() => ref.current!.focus(), 0)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      //@ts-ignore
      dispatch(fetchUpdateUserData(requestOptions))
    } else {
      alert('ничего не поменял')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div className={styles.nameWrapper}>
        <Input
          ref={nameRef}
          value={values[NAME]}
          onChange={handleChange}
          onIconClick={() => onIconClick('name', nameRef)}
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
  )
}

export default ProfileData
