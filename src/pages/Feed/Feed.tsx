import OrderFeedCard from '../../components/OrderFeedCard/OrderFeedCard'
import OrdersFeedStats from '../../components/OrdersFeedStats/OrdersFeedStats'
import { useAppSelector } from '../../hooks/hooks'
import { feed } from '../../utils/routerPath'
import styles from './Feed.module.css'

const Feed = () => {
  const data = useAppSelector((state) => state.rootReducer.ordersFeed.data)

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
                  link={`${feed}/:${order.number}`}
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
