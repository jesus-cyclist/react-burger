import React from 'react'
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

const BurgerConstructorList = () => {
  const { buh, filling, totalAmount } = useAppSelector(
    (state) => state.rootReducer.constructorList
  )

  const dispatch = useAppDispatch()

  return (
    <div className={style.list}>
      {totalAmount > 0 && (
        <>
          {buh && (
            <BurgerConstructorItem
              text={`${buh.name}  (верх)`}
              type="top"
              thumbnail={buh.image}
              price={buh.price}
              dragIcon={false}
              onClick={() =>
                dispatch({
                  type: OPEN_MODAL,
                  content: <IngredientDetails data={buh} />,
                })
              }
            />
          )}

          <div className={style.ingredients}>
            {filling.map((item, ind, arr) => (
              <BurgerConstructorItem
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
                last={ind === arr.length - 1 ? false : true}
                onClick={() =>
                  dispatch({
                    type: OPEN_MODAL,
                    content: <IngredientDetails data={item} />,
                  })
                }
              />
            ))}
          </div>
          {buh && (
            <BurgerConstructorItem
              text={`${buh.name}  (низ)`}
              type="bottom"
              thumbnail={buh.image}
              price={buh.price}
              dragIcon={false}
              onClick={() =>
                dispatch({
                  type: OPEN_MODAL,
                  content: <IngredientDetails data={buh} />,
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
