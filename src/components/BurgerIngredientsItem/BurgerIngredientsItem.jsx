import React from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import PropTypes from 'prop-types'

const BurgerIngredientsItem = (props) => {
  const { item, setModalData } = props
  return (
    <div className={style.ingredient} onClick={() => setModalData(item)}>
      <div className={style.logoBox}>
        <img className={style.logo} src={item.image} alt={item.name} />
      </div>
      <div className={style.priceBox}>
        <span className={style.price}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={style.title}>{item.name}</h3>
    </div>
  )
}

BurgerIngredientsItem.propTypes = {
  item: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
}

export default BurgerIngredientsItem
