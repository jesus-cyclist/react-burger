import React from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useAppDispatch } from '../../hooks/hooks'
import { OPEN_MODAL } from '../../services/actions/modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

const BurgerIngredientsItem = (props) => {
  const dispatch = useAppDispatch()
  const { item } = props

  return (
    <div
      className={style.ingredient}
      onClick={() =>
        dispatch({
          type: OPEN_MODAL,
          content: <IngredientDetails data={item} />,
        })
      }
    >
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
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
}

export default BurgerIngredientsItem
