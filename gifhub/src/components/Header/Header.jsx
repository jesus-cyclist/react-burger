import React from 'react'
import styles from './Header.module.css'
import SwitchTheme from '../UI/SwitchTheme/SwitchTheme'
import DropDawn from '../UI/DropDawn/DropDawn'
import { ReactComponent as Profile } from '../../assets/svg/profile.svg'
import { NavLink } from 'react-router-dom'
import { homePagePath } from '../../constants/path'
import { useDispatch } from 'react-redux'
import { logOut } from '../../services/reducers/user'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const profileList = [
    { title: 'Settings' },
    { title: 'Log out', onClick: handleLogOut },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink className={styles.title} to={homePagePath}>
          GIF
          <div className={styles.titleHub}>hub</div>
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <SwitchTheme />
          </li>
          <li className={styles.navItem}>
            <DropDawn icon={<Profile />} list={profileList} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
