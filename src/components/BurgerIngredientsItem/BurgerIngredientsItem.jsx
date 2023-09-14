import React, { useContext, useEffect, useState } from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { OPEN_MODAL } from '../../services/actions/modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { useDrag } from 'react-dnd'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalDataContext } from '../../context/appContext'

const BurgerIngredientsItem = (props) => {
  const [count, setCount] = useState(0)
  const { item } = props
  const { bun, filling } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )
  const dispatch = useAppDispatch()
  const setModalContent = useContext(ModalDataContext)

  useEffect(() => {
    const bunCount = bun.name === item.name ? 2 : 0
    const fillingCount = filling.reduce(
      (acc, ingredient) =>
        ingredient.name === item.name ? (acc += 1) : (acc += 0),
      0
    )
    setCount(item.type === 'bun' ? bunCount : fillingCount)
  }, [bun, filling, item])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
  })

  return (
    <div
      className={style.ingredient}
      onClick={() => {
        dispatch({ type: OPEN_MODAL })
        setModalContent(<IngredientDetails data={item} />)
      }}
      ref={dragRef}
    >
      <div className={style.logoBox}>
        <img className={style.logo} src={item.image} alt={item.name} />
      </div>
      <div className={style.priceBox}>
        <span className={style.price}>{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={style.title}>{item.name}</h3>
      {count > 0 && (
        <div className={style.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
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
