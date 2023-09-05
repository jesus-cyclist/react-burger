import React from 'react'
import AppHeaderStyles from './AppHeader.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderItem from '../AppHeaderItem/AppHeaderItem'

const AppHeader = () => {
  return (
    <header className={AppHeaderStyles.header}>
      <div className={AppHeaderStyles.wrapper}>
        <nav className={AppHeaderStyles.navigation}>
          <ul className={AppHeaderStyles.menu}>
            <li className={AppHeaderStyles.menuItem}>
              <AppHeaderItem title={'Конструктор'} />
            </li>
            <li className={AppHeaderStyles.menuItem}>
              <AppHeaderItem title={'Лента заказов'} />
            </li>
          </ul>
          <a href="#" className={AppHeaderStyles.logo}>
            <Logo />
          </a>
          <div className={AppHeaderStyles.account}>
            <AppHeaderItem title={'Личный кабинет'} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
