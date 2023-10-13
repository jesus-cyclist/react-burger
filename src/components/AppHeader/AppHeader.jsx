import React, { useEffect, useState } from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import {
  PROFILE_TAB,
  CONSTRUCTOR_TAB,
  ORDERS_LIST_TAB,
} from '../../utils/menuNav'
import { NavLink, useLocation } from 'react-router-dom'
import { homePagePath, profilePath, ordersList } from '../../utils/routerPath'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../hooks/hooks'

const AppHeader = () => {
  const [activeTab, setActiveTab] = useState(null)

  const { isAuthenticated } = useAppSelector((state) => state.rootReducer.user)

  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case homePagePath:
        setActiveTab(CONSTRUCTOR_TAB)
        break
      case ordersList:
        setActiveTab(ORDERS_LIST_TAB)
        break
      case profilePath:
        setActiveTab(PROFILE_TAB)
        break
      default:
        break
    }
  }, [location])

  function isActive(tab) {
    return activeTab === tab ? 'primary' : 'secondary'
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <li className={styles.tab}>
              <BurgerIcon type={isActive(CONSTRUCTOR_TAB)} />
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
                to={homePagePath}
              >
                {'Конструктор'}
              </NavLink>
            </li>

            <li className={styles.tab}>
              <ListIcon type={isActive(ORDERS_LIST_TAB)} />
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
                to={ordersList}
              >
                {'Лента заказов'}
              </NavLink>
            </li>
          </ul>

          <NavLink to={homePagePath} className={styles.logo}>
            <Logo />
          </NavLink>

          <div className={styles.tab}>
            <ProfileIcon type={isActive(PROFILE_TAB)} />
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
              to={profilePath}
            >
              {'Личный кабинет'}
            </NavLink>
            {isAuthenticated ? (
              <span>Вы авторизированы</span>
            ) : (
              <span>Вы вышли</span>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
