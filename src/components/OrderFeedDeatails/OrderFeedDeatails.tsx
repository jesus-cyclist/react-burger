import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredientsMap } from '../../services/selectors/ingredientsSelectors'
import { getOrdersFeedData } from '../../services/selectors/ordersFeedSelectors'
import { allOrdersPath } from '../../utils/request'
import { TIngredient, TOrder } from '../../utils/types'
import OrderFeedDetailsCard from '../OrderFeedDetailsCard/OrderFeedDetailsCard'
import styles from './OrderFeedDeatails.module.css'

type TIngredientWithCount = TIngredient & { count: number }

const OrderFeedDeatails = () => {
  const location = useLocation()
  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null)
  const [burgerStructure, setBurgerStructure] =
    useState<Array<TIngredient> | null>(null)
  const [orderPrice, setOrderPrice] = useState<null | number>(null)
  const ingredientsData = useAppSelector(selectIngredientsMap)

  const data = useAppSelector(getOrdersFeedData)

  useEffect(() => {
    fetch(`${allOrdersPath}${location.state.number}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error ${res.status}`)
      )
      .then((res) => setCurrentOrder(res.orders[0]))
  }, [])

  useEffect(() => {
    if (currentOrder && ingredientsData) {
      const totalCost = currentOrder.ingredients.reduce(
        (total: number, ingredientId: string) => {
          if (ingredientsData && ingredientsData.get(ingredientId)) {
            return (total += ingredientsData.get(ingredientId)?.price || 0)
          }
          return total
        },
        0
      )

      setOrderPrice(totalCost)

      const structure: Array<TIngredient> = []
      currentOrder.ingredients.forEach(
        (ingredientId: string, index: number, array: Array<string>) => {
          const repeatIngredient = structure.some(
            (ingredient) => ingredient._id === ingredientId
          )
          if (repeatIngredient) {
            return
          }
          const count = array.filter((ingId) => ingredientId === ingId).length

          const ingredientCount: TIngredientWithCount = {
            ...ingredientsData.get(ingredientId),
            count,
          }

          structure.push(ingredientCount)
        }
      )

      setBurgerStructure(structure)
    }
  }, [currentOrder])

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
      {currentOrder ? (
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
    </div>
  )
}

export default OrderFeedDeatails
