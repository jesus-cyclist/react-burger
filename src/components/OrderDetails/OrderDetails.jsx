import React, { useEffect } from 'react'
import style from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { ThreeDots } from 'react-loader-spinner'
import { fetchOrderData } from '../../services/reducers/order'

const OrderDetails = () => {
  const ingredients = useAppSelector(
    (state) => state.rootReducer.ingredients.data
  )
  const { data } = useAppSelector((state) => state.rootReducer.order)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ingredients) {
      const allIngredientsId = ingredients.reduce((acc, item) => {
        acc.push(item._id)
        return acc
      }, [])

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: allIngredientsId }),
      }

      dispatch(fetchOrderData(payload))
    }
  }, [])

  return (
    <>
      {data ? (
        <>
          <div className={style.order}>
            <div className={style.main}>
              <div className={style.orderNumber}>
                <p className="text text_type_digits-large">
                  {data.order.number}
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
