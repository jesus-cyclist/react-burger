import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useParams } from 'react-router-dom'
import styles from './OrderFeedDeatails.module.css'
import { useSelector } from 'react-redux'
import { getOrdersFeedData } from '../../services/selectors/ordersFeedSelectors'
import { TIngredient, TOrder } from '../../utils/types'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredientsMap } from '../../services/selectors/ingredientsSelectors'
import OrderFeedDetailsCard from '../OrderFeedDetailsCard/OrderFeedDetailsCard'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'

const OrderFeedDeatails = () => {
  const params = useParams()
  const location = useLocation()
  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null)
  const [burgerStructure, setBurgerStructure] =
    useState<Array<TIngredient> | null>(null)
  const [orderPrice, setOrderPrice] = useState<null | number>(null)
  const ingredientsData = useAppSelector(selectIngredientsMap)

  const data = useSelector(getOrdersFeedData)

  useEffect(() => {
    if (params?.id && data?.orders) {
      const requiredId = params.id.slice(1)
      const order = data?.orders.find(
        (order: TOrder) => order._id === requiredId
      )

      const totalCost = order.ingredients.reduce(
        (total: number, ingredients: string) => {
          return (total += ingredientsData[ingredients].price)
        },
        0
      )

      setOrderPrice(totalCost)
      setCurrentOrder(order)

      const structure: Array<TIngredient> = []
      order.ingredients.forEach(
        (ingredientId: string, index: number, array: Array<string>) => {
          const repeatIngredient = structure.some(
            (ingredient) => ingredient._id === ingredientId
          )
          if (repeatIngredient) {
            return
          }
          const count = array.filter((ingId) => ingredientId === ingId).length
          const ingredientCount: TIngredient = {
            ...ingredientsData[ingredientId],
            count,
          }

          structure.push(ingredientCount)
        }
      )

      setBurgerStructure(structure)
    }
  }, [params, data?.orders])

  const orderStatus = (status: string) => {
    switch (status) {
      case 'done':
        return 'Выполнен'
      case 'pending':
        return 'В работе'
      case 'created':
        return 'Готов'
    }
  }

  return (
    <div className={!location.state ? styles.wrapper : ''}>
      {currentOrder && data?.orders && (
        <div className={styles.container}>
          <span
            className={styles.orderNumber}
          >{`#${currentOrder.number}`}</span>
          <h2 className={styles.orderTitle}>{currentOrder.name}</h2>
          <span className={styles.orderStatus}>
            {orderStatus(currentOrder.status)}
          </span>
          <span className={styles.orderStructureTitle}>Состав:</span>
          <div className={styles.orderStructure}>
            {burgerStructure &&
              burgerStructure.map((ingredients) => (
                <OrderFeedDetailsCard
                  key={ingredients._id}
                  ingredients={ingredients}
                />
              ))}
          </div>
          <div className={styles.orderData}>
            <FormattedDate date={new Date(currentOrder.createdAt)} />
            <div className={styles.orderCost}>
              <CurrencyIcon type="primary" />
              <span>{orderPrice}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderFeedDeatails
