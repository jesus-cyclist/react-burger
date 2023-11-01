import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import styles from './Feed.module.css'

import OrderFeedCard from '../../components/OrderFeedCard/OrderFeedCard'
import OrdersFeedStats from '../../components/OrdersFeedStats/OrdersFeedStats'
import { feed } from '../../utils/routerPath'
import { useEffect, useState } from 'react'
import { TOrder } from '../../utils/types'

const Feed = () => {
  const data = useAppSelector((state) => state.rootReducer.ordersFeed.data)

  useEffect(() => {
    if (data) {
      const getSortedOrders = [...data.orders].sort(
        (frstOrder, scndOrder) => scndOrder.number - frstOrder.number
      )
    }
  }, [data])

  return (
    <div className={styles.container}>
      <h2 className={styles.orderFeedTitle}>Лента заказов</h2>
      <div className={styles.orderFeed}>
        <div className={styles.orderFeedCards}>
          {data &&
            data.orders.map((order) => {
              return (
                <OrderFeedCard
                  key={order.number}
                  orderFeedData={order}
                  link={`${feed}/:${order._id}`}
                  state={'orderFeed'}
                />
              )
            })}
        </div>

        {data && <OrdersFeedStats orderFeedData={data} />}
      </div>
    </div>
  )
}

export default Feed
