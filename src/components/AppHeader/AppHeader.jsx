import React, { useEffect } from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import {
  SET_PROFILE_ACTIVE,
  SET_CONSTUCTOR_TAB_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
} from '../../utils/menuNav'
import AppHeaderItem from '../AppHeaderItem/AppHeaderItem'
import { NavLink } from 'react-router-dom'
import { homePagePath } from '../../utils/routerPath'
import Cookies from 'js-cookie' //я не могу расположить данный модуль в App мне выдает ошибку/ в чем проблема?
import { useAppDispatch } from '../../hooks/hooks'
import { refreshToken } from '../../utils/token'
import { request } from '../../utils/request'
import {
  CHECK_REFRESH_TOKEN_FAILED,
  CHECK_REFRESH_TOKEN_REQUEST,
  CHECK_REFRESH_TOKEN_SUCCESS,
} from '../../services/actions/userData'

const AppHeader = () => {
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   if (Cookies.get(refreshToken)) {
  //     const requestObj = {
  //       routing: `auth/token`,
  //       action: {
  //         failed: CHECK_REFRESH_TOKEN_FAILED,
  //         request: CHECK_REFRESH_TOKEN_REQUEST,
  //         success: CHECK_REFRESH_TOKEN_SUCCESS,
  //       },
  //       data: {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           token: Cookies.get(refreshToken),
  //         }),
  //       },
  //     }

  //     dispatch(request(requestObj))
  //   }
  // }, [])

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <AppHeaderItem tabValue={SET_CONSTUCTOR_TAB_ACTIVE} />
            <AppHeaderItem tabValue={SET_ORDERS_LIST_ACTIVE} />
          </ul>
          <NavLink to={homePagePath} className={styles.logo}>
            <Logo />
          </NavLink>
          <AppHeaderItem tabValue={SET_PROFILE_ACTIVE} />
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
