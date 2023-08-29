import React from 'react'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderItemStyles from './AppHeaderItem.module.css'
import PropTypes from 'prop-types'

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
      <a href="#" className={AppHeaderItemStyles.title}>
        {props.title}
      </a>
    </>
  )
}

AppHeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AppHeaderItem
