import React from 'react'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderItemStyles from './AppHeaderItem.module.css'

const AppHeaderItem = (props) => {
  function chooseElement() {
    if (props.title === 'Конструктор') return <BurgerIcon type="secondary" />
    if (props.title === 'Лента заказов') return <ListIcon type="secondary" />
    if (props.title === 'Личный кабинет')
      return <ProfileIcon type="secondary" />
    return null
  }

  return (
    <>
      {chooseElement(props.title)}
      <span className={AppHeaderItemStyles.title}>{props.title}</span>
    </>
  )
}

export default AppHeaderItem
