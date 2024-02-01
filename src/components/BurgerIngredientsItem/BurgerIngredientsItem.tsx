import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import { NavLink, useLocation } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { useAppSelector } from '../../hooks/hooks'
import {
  selectBun,
  selectFilling,
} from '../../services/selectors/constructorSelectors'
import { ingredientsPath } from '../../utils/routerPath'
import { TIngredient } from '../../utils/types'
import styles from './BurgerIngredientsItem.module.css'

type TBurgerIngredientsItemProps = {
  item: TIngredient
}

const BurgerIngredientsItem = (
  props: TBurgerIngredientsItemProps
): JSX.Element => {
  const [isComponentMouned, setIsComponentMounted] = useState(false)
  const [count, setCount] = useState(0)
  const { item } = props
  const bun = useAppSelector(selectBun)
  const filling = useAppSelector(selectFilling)
  const location = useLocation()
  const nodeRef = useRef(null)

  useEffect(() => setIsComponentMounted(true), [])

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
    <Transition nodeRef={nodeRef} in={isComponentMouned} timeout={500}>
      {(state) => (
        <div
          ref={nodeRef}
          className={styles[state]}
          data-test-id={'burger-ingredient'}
        >
          <NavLink
            className={`${styles.ingredient}`}
            to={`${ingredientsPath}/:${item._id}`}
            state={{ ingredientsLocation: location }}
            ref={dragRef}
          >
            <div className={styles.logoBox}>
              <img className={styles.logo} src={item.image} alt={item.name} />
            </div>
            <div className={styles.priceBox}>
              <span className={styles.price}>{item.price}</span>
              <CurrencyIcon type='primary' />
            </div>
            <h3 className={styles.title}>{item.name}</h3>
            {count > 0 && (
              <div className={styles.counter}>
                <Counter count={count} size='default' />
              </div>
            )}
          </NavLink>
        </div>
      )}
    </Transition>
  )
}

export default BurgerIngredientsItem
