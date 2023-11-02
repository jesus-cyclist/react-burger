import React, { useEffect, useState } from 'react'
import style from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom'
import { ingredientsPath } from '../../utils/routerPath'
import { TIngredient } from '../../utils/types'
import { useSelector } from 'react-redux'
import {
  selectBun,
  selectFilling,
} from '../../services/selectors/constructorSelectors'

type TBurgerIngredientsItemProps = {
  item: TIngredient
}

const BurgerIngredientsItem = (
  props: TBurgerIngredientsItemProps
): JSX.Element => {
  const [count, setCount] = useState(0)
  const { item } = props
  const bun = useSelector(selectBun)
  const filling = useSelector(selectFilling)
  const location = useLocation()

  useEffect(() => {
    let bunCount = 0
    if (bun) bunCount = bun.name === item.name ? 2 : 0

    let fillingCount = 0
    if (filling)
      fillingCount = filling.reduce(
        (acc: number, ingredient: TIngredient) =>
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
    <NavLink
      className={style.ingredient}
      to={`${ingredientsPath}/:${item._id}`}
      state={{ ingredientsLocation: location }}
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
    </NavLink>
  )
}

export default BurgerIngredientsItem
