import React from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredientsItem = ({ item }) => {
  return (
    <div className={style.ingredient}>
      <div className={style.logoBox}>
        <img className={style.logo} src={item.image} alt={item.name} />
      </div>
      <div className={style.priceBox}>
        <CurrencyIcon type="primary" />
        <span className={style.price}>{item.price}</span>
      </div>
      <div className={style.title}>{item.name}</div>
    </div>
  )
}

export default BurgerIngredientsItem
