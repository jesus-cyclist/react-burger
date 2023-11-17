import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import {
  selectBun,
  selectFilling,
} from '../../services/selectors/constructorSelectors'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import { loginPath, orderPath } from '../../utils/routerPath'
import { TIngredient } from '../../utils/types'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import style from './BurgerConstructorList.module.css'

const BurgerConstructorList = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const bun = useAppSelector(selectBun)
  const filling = useAppSelector(selectFilling)

  const location = useLocation()

  const [fill, setFill] = useState<Array<TIngredient>>([])
  useEffect(() => {
    filling && setFill(filling)
  }, [filling])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setFill((prevState: Array<TIngredient>) => {
      return update(prevState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevState[dragIndex]],
        ],
      })
    })
  }, [])

  useEffect(() => {
    let bunCost = 0
    let fillingCost = 0
    if (bun) {
      bunCost = bun.price ? bun.price * 2 : 0
    }

    if (filling) {
      fillingCost =
        filling.length > 0
          ? filling.reduce(
              (acc: number, item: TIngredient) => (acc += item.price),
              0
            )
          : 0
    }

    setTotalAmount(bunCost + fillingCost)
  }, [bun, filling])

  return (
    <div className={style.list} data-test-id="burger-constructor-list">
      {totalAmount > 0 && (
        <>
          {bun && bun.price && (
            <BurgerConstructorItem
              item={bun}
              id={bun.key || ''}
              text={`${bun.name}  (верх)`}
              position="top"
              dragIcon={false}
              isLocked={true}
              last={false}
              moveCard={() => {}}
              index={0}
              type={'bun'}
            />
          )}

          {fill && (
            <div className={style.ingredients}>
              {fill.map(
                (item: TIngredient, ind: number, arr: TIngredient[]) => {
                  return (
                    <BurgerConstructorItem
                      moveCard={moveCard}
                      index={ind}
                      key={item.key}
                      id={item.key || ''}
                      text={item.name}
                      isLocked={false}
                      item={item}
                      last={ind === arr.length - 1 ? false : true}
                      dragIcon={true}
                      position={undefined}
                      type={item.type}
                    />
                  )
                }
              )}
            </div>
          )}
          {bun && bun.price && (
            <BurgerConstructorItem
              item={bun}
              id={bun.key || ''}
              text={`${bun.name}  (низ)`}
              position="bottom"
              dragIcon={false}
              isLocked={true}
              last={false}
              moveCard={() => {}}
              index={0}
              type={'bun'}
            />
          )}

          <div className={style.order}>
            <div className={style.total}>
              <span className={style.totalCost} data-test-id="total-price">
                {totalAmount}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <NavLink
              to={isAuthenticated ? orderPath : loginPath}
              state={isAuthenticated && { orderLocation: location }}
              data-test-id={'create-order-button'}
            >
              <Button htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  )
}

export default BurgerConstructorList
