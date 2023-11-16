import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom'
import uniqid from 'uniqid'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredientsMap } from '../../services/selectors/ingredientsSelectors'
import { TOrder } from '../../utils/types'
import styles from './OrderFeedCard.module.css'

type TOrderFeedCard = {
  orderFeedData: TOrder
  link: string
  state: string
}

const OrderFeedCard = (props: TOrderFeedCard): JSX.Element => {
  const { orderFeedData, link, state } = props
  const ingredientsData = useAppSelector(selectIngredientsMap)
  const totalCost = orderFeedData.ingredients.reduce((total, ingredientId) => {
    if (ingredientsData && ingredientsData.get(ingredientId)) {
      return total + (ingredientsData.get(ingredientId)?.price || 0)
    }
    return total
  }, 0)
  const location = useLocation()

  return (
    <div className={styles.container}>
      <NavLink
        to={link}
        state={{ [state]: location, number: orderFeedData.number }}
      >
        <div className={styles.orderDetails}>
          <span className={styles.orderNumber}>#{orderFeedData.number}</span>
          <div className={styles.orderDate}>
            <FormattedDate date={new Date(orderFeedData.createdAt)} />
          </div>
        </div>
        <span className={styles.orderTitle}>{orderFeedData.name}</span>
        <div className={styles.orderComposirion}>
          <div className={styles.ingredientImgContainer}>
            {orderFeedData.ingredients.map((ingredientId, index, array) => {
              const overIngredients = array.length - 6
              const style = {
                left: `${index * 45}px`,
                zIndex:
                  index > 5
                    ? '1'
                    : `${array.length - overIngredients - index + 1}`,
                display: index > 5 ? 'none' : 'block',
              }
              const uniqueKey = uniqid()
              return (
                <div
                  key={uniqueKey}
                  className={styles.ingredientImg}
                  style={style}
                >
                  {!!overIngredients && index === 5 && (
                    <>
                      <div className={styles.ingredientOverlay}></div>
                      <div className={styles.ingredientOverCount}>
                        <span>{`+${overIngredients}`}</span>
                      </div>
                    </>
                  )}
                  {ingredientsData && (
                    <img
                      src={ingredientsData.get(ingredientId)?.image_mobile}
                      alt={ingredientsData.get(ingredientId)?.name}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className={styles.ingredientsTotalCost}>
            {totalCost} <CurrencyIcon type="primary" />
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default OrderFeedCard
