import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { logout } from '../../services/reducers/user'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import {
  SET_ORDERS_LIST_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
} from '../../utils/profileNav'
import ProfileHint from '../ProfileHint/ProfileHint'
import styles from './ProfileNav.module.css'

type TProfileNavProps = {
  activeTab: string
  onClickHandler: (a: string) => void
}

const ProfileNav = (props: TProfileNavProps): JSX.Element => {
  const { activeTab, onClickHandler } = props
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

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
            <span
              className={isTabActive(SET_PROFILE_DATA_ACTIVE)}
              onClick={() => onClickHandler(SET_PROFILE_DATA_ACTIVE)}
            >
              Профиль
            </span>
          </li>
          <li className={styles.navItem}>
            <span
              className={isTabActive(SET_ORDERS_LIST_ACTIVE)}
              onClick={() => onClickHandler(SET_ORDERS_LIST_ACTIVE)}
            >
              История заказов
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.exitButton} onClick={logoutClickHandler}>
              Выход
            </span>
          </li>
        </ul>
      </nav>
      <ProfileHint activeTab={activeTab} />
    </div>
  )
}

export default ProfileNav
