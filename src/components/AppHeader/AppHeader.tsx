import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import {} from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import {
  CONSTRUCTOR_TAB,
  ORDERS_LIST_TAB,
  PROFILE_TAB,
} from '../../utils/menuNav'
import { feed, homePagePath, profilePath } from '../../utils/routerPath'
import styles from './AppHeader.module.css'

type TActiveTab = string | null

const AppHeader = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TActiveTab>(null)

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case homePagePath:
        setActiveTab(CONSTRUCTOR_TAB)
        break
      case feed:
        setActiveTab(ORDERS_LIST_TAB)
        break
      case profilePath:
        setActiveTab(PROFILE_TAB)
        break
      default:
        break
    }
  }, [location])

  function isActive(tab: string) {
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
                to={feed}
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
          </div>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
