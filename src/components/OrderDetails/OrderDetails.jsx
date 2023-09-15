import React, { useEffect } from 'react'
import style from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { request } from '../../utils/request'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../../services/actions/modal'

const OrderDetails = () => {
  const ingredients = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu.ingredients
  )

  const orderData = useAppSelector((state) => state.rootReducer.modal.orderData)

  const allIngredientsId = ingredients.reduce((acc, item) => {
    acc.push(item._id)
    return acc
  }, [])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const requestObj = {
      method: 'POST',
      routing: 'orders',
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: allIngredientsId }),
      },
      action: {
        request: GET_ORDER_REQUEST,
        success: GET_ORDER_SUCCESS,
        failed: GET_ORDER_FAILED,
      },
    }
    dispatch(request(requestObj))
  }, [])

  return (
    orderData && (
      <div className={style.order}>
        <div className={style.main}>
          <div className={style.orderNumber}>
            <p className="text text_type_digits-large">
              {orderData.order.number}
            </p>
          </div>
          <span className={style.orderNumberText}>идентификатор заказа</span>
          <div className={style.logoConfirm}>
            <div className={style.logo}>
              <CheckMarkIcon type="primary" />
            </div>
          </div>
          <span className={style.startedCookingText}>
            Ваш заказ начали готовить
          </span>
          <span className={style.waitToBeReadyText}>
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    )
  )
}

export default OrderDetails
