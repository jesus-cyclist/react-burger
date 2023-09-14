import React, { useCallback, useEffect, useState } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { OPEN_MODAL } from '../../services/actions/modal'
import update from 'immutability-helper'

const BurgerConstructorList = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const dispatch = useAppDispatch()
  const { bun, filling } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )

  const [fill, setFill] = useState()
  useEffect(() => setFill(filling), [filling])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setFill((prevState) => {
      console.log(prevState)
      return update(prevState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevState[dragIndex]],
        ],
      })
    })
  }, [])

  //тут лютая ахинея но я не понимаю как упростить

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
              onClick={() =>
                dispatch({
                  type: OPEN_MODAL,
                  content: <IngredientDetails data={bun} />,
                })
              }
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
                  onClick={() =>
                    dispatch({
                      type: OPEN_MODAL,
                      content: <IngredientDetails data={item} />,
                    })
                  }
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
              onClick={() =>
                dispatch({
                  type: OPEN_MODAL,
                  content: <IngredientDetails data={bun} />,
                })
              }
            />
          )}

          <div className={style.order}>
            <div className={style.total}>
              <span className={style.totalCost}>{totalAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() =>
                dispatch({
                  type: OPEN_MODAL,
                  content: <OrderDetails />,
                })
              }
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default BurgerConstructorList
