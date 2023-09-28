import React from 'react'
import {
  SET_PROFILE_ACTIVE,
  SET_CONSTUCTOR_TAB_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
} from '../../utils/menuNav'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import styles from './AppHeaderItem.module.css'
import { useAppSelector } from '../../hooks/hooks'
import { homePagePath, profilePath } from '../../utils/routerPath'

const AppHeaderItem = (props) => {
  const { tabValue, activeTab } = props

  const { user, isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  const tab = (tabType) => {
    switch (tabType) {
      case SET_CONSTUCTOR_TAB_ACTIVE: {
        return (
          <li className={`${styles.tab} ${styles.constructor}`}>
            {' '}
            <BurgerIcon
              type={
                activeTab === SET_CONSTUCTOR_TAB_ACTIVE
                  ? 'primary'
                  : 'secondary'
              }
            />
            <NavLink to={homePagePath}>{'Конструктор'}</NavLink>
          </li>
        )
      }
      case SET_ORDERS_LIST_ACTIVE: {
        return (
          <li className={styles.tab}>
            <ListIcon
              type={
                activeTab === SET_ORDERS_LIST_ACTIVE ? 'primary' : 'secondary'
              }
            />
            <NavLink to={homePagePath}>{'Лента заказов'}</NavLink>
          </li>
        )
      }
      case SET_PROFILE_ACTIVE: {
        return (
          <div className={`${styles.tab} ${styles.account}`}>
            <ProfileIcon
              type={activeTab === SET_PROFILE_ACTIVE ? 'primary' : 'secondary'}
            />
            <NavLink to={profilePath}>{'Личный кабинет'}</NavLink>
            {isAuthenticated ? (
              <span>Вы авторизированы</span>
            ) : (
              <span>Вы вышли</span>
            )}
          </div>
        )
      }

      default:
        return null
    }
  }

  return <>{tab(tabValue)}</>
}

export default AppHeaderItem
