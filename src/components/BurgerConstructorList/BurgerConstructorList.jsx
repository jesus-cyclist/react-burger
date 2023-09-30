import React, { useCallback, useEffect, useState } from 'react'
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

const BurgerConstructorList = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const { isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )
  const dispatch = useAppDispatch()
  const { bun, filling } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )

  const location = useLocation()

  const [fill, setFill] = useState()
  useEffect(() => setFill(filling), [filling])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setFill((prevState) => {
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
        ? filling.reduce((acc, item) => (acc += item.price), 0)
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
              thumbnail={bun.image}
              price={bun.price}
              dragIcon={false}
            />
          )}

          <div className={style.ingredients}>
            {fill.map((item, ind, arr) => {
              return (
                <BurgerConstructorItem
                  moveCard={moveCard}
                  index={ind}
                  key={item.key}
                  id={item.key}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  isLocked={false}
                  item={item}
                  last={ind === arr.length - 1 ? false : true}
                />
              )
            })}
          </div>
          {bun.price && (
            <BurgerConstructorItem
              item={bun}
              id={bun.key}
              text={`${bun.name}  (низ)`}
              position="bottom"
              thumbnail={bun.image}
              price={bun.price}
              dragIcon={false}
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
