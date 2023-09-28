import React, { useEffect, useState } from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { OPEN_MODAL } from '../../services/actions/modal'
import { useDrag } from 'react-dnd'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from '../../utils/prop-types'

const BurgerIngredientsItem = (props) => {
  const [count, setCount] = useState(0)
  const { item, setModalIngredient } = props
  const { bun, filling } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )

  const dispatch = useAppDispatch()

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
        setModalIngredient(item)
        dispatch({ type: OPEN_MODAL, modalType: 'ingredient' })
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
  item: PropTypes.shape(ingredientPropType.isRequired).isRequired,
}

export default BurgerIngredientsItem
