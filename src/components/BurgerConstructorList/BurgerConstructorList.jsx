import React, { useCallback, useContext, useEffect, useState } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import OrderDetails from '../OrderDetails/OrderDetails'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { OPEN_MODAL } from '../../services/actions/modal'
import update from 'immutability-helper'
import Modal from '../Modal/Modal'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructorList'

const BurgerConstructorList = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const dispatch = useAppDispatch()
  const { bun, filling } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )
  const { isModalActive, modalType } = useAppSelector(
    (state) => state.rootReducer.modal
  )

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

  function clearCounstructorIngredients() {
    dispatch({ type: CLEAR_CONSTRUCTOR })
  }

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
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() => {
                dispatch({
                  type: OPEN_MODAL,
                  modalType: 'order',
                })
              }}
            >
              Оформить заказ
            </Button>
          </div>
          {isModalActive && modalType === 'order' && (
            <Modal clearCounstructorIngredients={clearCounstructorIngredients}>
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </div>
  )
}

export default BurgerConstructorList
