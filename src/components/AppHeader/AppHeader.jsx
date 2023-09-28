import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import {
  SET_PROFILE_ACTIVE,
  SET_CONSTUCTOR_TAB_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
} from '../../utils/menuNav'
import AppHeaderItem from '../AppHeaderItem/AppHeaderItem'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'

const AppHeader = () => {
  const { user } = useAppSelector((state) => state.rootReducer.profileData)

  const logoRouter = (isAuthenticated) => {
    return isAuthenticated ? '/' : '/login'
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <AppHeaderItem tabValue={SET_CONSTUCTOR_TAB_ACTIVE} />
            <AppHeaderItem tabValue={SET_ORDERS_LIST_ACTIVE} />
          </ul>
          <NavLink to={logoRouter(user)} className={styles.logo}>
            <Logo />
          </NavLink>
          <AppHeaderItem tabValue={SET_PROFILE_ACTIVE} />
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
