import React, { useEffect } from 'react'
import style from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { request } from '../../utils/request'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../../services/actions/order'
import { ThreeDots } from 'react-loader-spinner'

const OrderDetails = () => {
  const ingredients = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu.ingredients
  )
  const { response } = useAppSelector((state) => state.rootReducer.order)

  const allIngredientsId = ingredients.reduce((acc, item) => {
    acc.push(item._id)
    return acc
  }, [])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const requestObj = {
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
    <>
      {response ? (
        <>
          <div className={style.order}>
            <div className={style.main}>
              <div className={style.orderNumber}>
                <p className="text text_type_digits-large">
                  {response.order.number}
                </p>
              </div>
              <span className={style.orderNumberText}>
                идентификатор заказа
              </span>
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
        </>
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4C4CFF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={true}
        />
      )}
    </>
  )
}

export default OrderDetails
