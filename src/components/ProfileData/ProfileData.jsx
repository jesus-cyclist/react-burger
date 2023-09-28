import React, { useEffect, useRef, useState } from 'react'
import styles from './ProfileData.module.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../hooks/hooks'
import { useDispatch } from 'react-redux'
import { request } from '../../utils/request'
import {
  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
} from '../../services/actions/profileData'
import Cookies from 'js-cookie'
import { refreshCookie } from '../../utils/token'

const ProfileData = () => {
  const { login, password, name } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get(refreshCookie)
    const requestObj = {
      routing: `auth/user`,
      action: {
        failed: GET_USER_DATA_FAILED,
        request: GET_USER_DATA_REQUEST,
        success: GET_USER_DATA_SUCCESS,
      },
      data: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    }
    console.log(requestObj)
    dispatch(request(requestObj))
  }, [])

  const nameRef = useRef(null)
  const loginRef = useRef(null)
  const passwordRef = useRef(null)
  const [currentProfileData, setCurrentProfileData] = useState({
    login: '',
    password: '',
    name: '',
  })

  const [editInput, setEditInput] = useState(null)

  function onIconClick(inputType, ref) {
    setEditInput(inputType)
    setTimeout(() => ref.current.focus(), 0)
  }

  useEffect(() => {
    function escapeHandler(event) {
      setEditInput(null)
    }

    document.addEventListener('click', escapeHandler)
    return () => {
      document.removeEventListener('click', escapeHandler)
    }
  }, [])

  return (
    <main className="">
      <div className={styles.nameWrapper}>
        <Input
          ref={nameRef}
          value={currentProfileData.name}
          onChange={(e) =>
            setCurrentProfileData({
              ...currentProfileData,
              name: e.target.value,
            })
          }
          onIconClick={(e) => onIconClick('name', nameRef)}
          placeholder={'Имя'}
          type={'text'}
          icon={'EditIcon'}
          disabled={editInput === 'name' ? false : true}
        />
      </div>
      <div className={styles.loginWrapper}>
        <Input
          ref={loginRef}
          value={currentProfileData.login}
          onChange={(e) =>
            setCurrentProfileData({
              ...currentProfileData,
              login: e.target.value,
            })
          }
          onIconClick={() => onIconClick('login', loginRef)}
          placeholder={'Логин'}
          type={'text'}
          icon={'EditIcon'}
          disabled={editInput === 'login' ? false : true}
        />
      </div>
      <div className={styles.passwordWrapper}>
        <Input
          ref={passwordRef}
          value={currentProfileData.password}
          onChange={(e) =>
            setCurrentProfileData({
              ...currentProfileData,
              password: e.target.value,
            })
          }
          onIconClick={() => onIconClick('password', passwordRef)}
          placeholder={'Пароль'}
          type={editInput === 'password' ? 'text' : 'password'}
          icon={'EditIcon'}
          disabled={editInput === 'password' ? false : true}
        />
      </div>
    </main>
  )
}

export default ProfileData
