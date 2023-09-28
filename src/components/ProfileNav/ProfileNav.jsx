import React from 'react'
import styles from './ProfileNav.module.css'
import {
  SET_EXIT_PROFILE_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
} from '../../utils/profileNav'
import { LOGOUT_USER } from '../../services/actions/userData'
import ProfileHint from '../ProfileHint/ProfileHint'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Navigate } from 'react-router-dom'

const ProfileNav = (props) => {
  const { activeTab, onClickHandler } = props
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.rootReducer.profileData)

  const isTabActive = (linkValue) =>
    activeTab === linkValue ? `${styles.navlinkActive}` : `${styles.navlink}`

  const logoutClickHandler = () => {
    dispatch({ type: LOGOUT_USER })
  }

  if (!user) {
    return <Navigate to={'/login'} replace />
  }

  return (
    <div className={styles.container}>
      <nav className={styles.profileNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a
              href="#"
              className={isTabActive(SET_PROFILE_DATA_ACTIVE)}
              onClick={() => onClickHandler(SET_PROFILE_DATA_ACTIVE)}
            >
              Профиль
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              className={isTabActive(SET_ORDERS_LIST_ACTIVE)}
              onClick={() => onClickHandler(SET_ORDERS_LIST_ACTIVE)}
            >
              История заказов
            </a>
          </li>
          <li className={styles.navItem}>
            <button className={styles.exitButton} onClick={logoutClickHandler}>
              {' '}
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
