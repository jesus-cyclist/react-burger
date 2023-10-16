import React, { FC } from 'react'
import styles from './ProfileNav.module.css'
import {
  SET_ORDERS_LIST_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
} from '../../utils/profileNav'
import ProfileHint from '../ProfileHint/ProfileHint'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Link, Navigate } from 'react-router-dom'
import { logout } from '../../services/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'

type TProfileNavProps = {
  activeTab: string
  onClickHandler: (a: string) => void
}

const ProfileNav = (props: TProfileNavProps): JSX.Element => {
  const { activeTab, onClickHandler } = props
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const isTabActive = (linkValue: string) =>
    activeTab === linkValue ? `${styles.navlinkActive}` : `${styles.navlink}`

  const logoutClickHandler = () => {
    dispatch(logout())
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  return (
    <div className={styles.container}>
      <nav className={styles.profileNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="#"
              className={isTabActive(SET_PROFILE_DATA_ACTIVE)}
              onClick={() => onClickHandler(SET_PROFILE_DATA_ACTIVE)}
            >
              Профиль
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="#"
              className={isTabActive(SET_ORDERS_LIST_ACTIVE)}
              onClick={() => onClickHandler(SET_ORDERS_LIST_ACTIVE)}
            >
              История заказов
            </Link>
          </li>
          <li className={styles.navItem}>
            <button className={styles.exitButton} onClick={logoutClickHandler}>
              Выход
            </button>
          </li>
        </ul>
      </nav>
      <ProfileHint activeTab={activeTab} />
    </div>
  )
}

export default ProfileNav
