import React, { useCallback, useEffect, useState, useMemo } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import update from 'immutability-helper'
import { NavLink, useLocation } from 'react-router-dom'
import { loginPath, orderPath } from '../../utils/routerPath'
import { useSelector } from 'react-redux'
import { TIngredient } from '../../utils/types'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import {
  selectFilling,
  selectBun,
} from '../../services/selectors/constructorSelectors'

const BurgerConstructorList = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const bun = useSelector(selectBun)
  const filling = useSelector(selectFilling)

  const location = useLocation()

  const [fill, setFill] = useState<Array<TIngredient>>([])
  useEffect(() => setFill(filling), [filling])

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
    const bunCost = bun.price ? bun.price * 2 : 0
    const fillingCost =
      filling.length > 0
        ? filling.reduce(
            (acc: number, item: TIngredient) => (acc += item.price),
            0
          )
        : 0
    setTotalAmount(bunCost + fillingCost)
  }, [bun, filling])

  return (
    <div className={style.list}>
      {totalAmount > 0 && (
        <>
          {bun.price && (
            <BurgerConstructorItem
              item={bun}
              id={bun.key}
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
          {bun.price && (
            <BurgerConstructorItem
              item={bun}
              id={bun.key}
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
              <span className={style.totalCost}>{totalAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
            <NavLink
              to={isAuthenticated ? orderPath : loginPath}
              state={isAuthenticated && { orderLocation: location }}
            >
              <Button htmlType="submit" type="primary" size="large">
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
