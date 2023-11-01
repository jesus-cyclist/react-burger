import React, { useMemo } from 'react'
import styles from './OrdersFeedStats.module.css'
import { TOrder, TOrders } from '../../utils/types'
import { NavLink, useLocation } from 'react-router-dom'
import { feed } from '../../utils/routerPath'

const OrdersFeedStats = (props: { orderFeedData: TOrders }): JSX.Element => {
  const { orderFeedData } = props
  const location = useLocation()

  const onWorkOrders = useMemo(
    () =>
      orderFeedData?.orders
        .filter((order: TOrder) => order.status === 'pending')
        .slice(1, 20),
    [orderFeedData]
  )

  const readyOrders = useMemo(
    () =>
      orderFeedData?.orders
        .filter((order: TOrder) => order.status === 'done')
        .slice(1, 20),
    [orderFeedData]
  )

  return (
    <div className={styles.ordersStats}>
      <div className={styles.orderStatus}>
        <div className={styles.orders}>
          <h2 className={styles.ordersTitle}>Готовы:</h2>
          <div className={styles.ordersReady}>
            {readyOrders &&
              readyOrders.map((order: TOrder) => (
                <NavLink
                  className={styles.ordersReadyLink}
                  to={`${feed}/:${order._id}`}
                  key={order._id}
                  state={{ orderFeed: location }}
                >
                  {order.number}
                </NavLink>
              ))}
          </div>
        </div>
        <div className={styles.orders}>
          <h2 className={styles.ordersTitle}>В работе:</h2>
          <div className={styles.ordersInWork}>
            {onWorkOrders &&
              onWorkOrders.map((order: TOrder) => <h2>{order.number}</h2>)}
          </div>
        </div>
      </div>
      <div className={styles.ordersTotalStats}>
        <span className={styles.orderStatsTitle}>Выполнено за все время:</span>
        <span className={styles.orderStatsValue}>{orderFeedData.total}</span>
      </div>
      <div className={styles.ordersStatsToday}>
        <span className={styles.orderStatsTitle}>Выполнено за сегодня:</span>
        <span className={styles.orderStatsValue}>
          {orderFeedData.totalToday}
        </span>
      </div>
    </div>
  )
}

export default OrdersFeedStats
