import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import OrderFeedCard from '../../components/OrderFeedCard/OrderFeedCard'
import ProfileMain from '../../components/ProfileMain/ProfileMain'
import ProfileNav from '../../components/ProfileNav/ProfileNav'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  connectProfile as connectProfileOrderFeed,
  disconnectProfile as disconnectProfileOrderFeed,
} from '../../services/actions/orderFeed'
import {
  SET_ORDERS_LIST_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
} from '../../utils/profileNav'
import { socketPathProfile } from '../../utils/request'
import { profileOrders } from '../../utils/routerPath'
import { accessToken } from '../../utils/token'
import styles from './Profile.module.css'

const Profile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(SET_PROFILE_DATA_ACTIVE)
  const dispatch = useAppDispatch()
  const orders = useAppSelector(
    (store) => store.rootReducer.profileOrderFeed.data?.orders
  )

  useEffect(() => {
    const token = Cookies.get(accessToken)
    dispatch(connectProfileOrderFeed(`${socketPathProfile}?token=${token}`))
    return () => {
      dispatch(disconnectProfileOrderFeed())
    }
  }, [])

  const onClickHandler = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.wrapper}>
      <ProfileNav activeTab={activeTab} onClickHandler={onClickHandler} />
      {activeTab === SET_PROFILE_DATA_ACTIVE && (
        <ProfileMain activeTab={activeTab} />
      )}

      {activeTab === SET_ORDERS_LIST_ACTIVE && orders && (
        <div className={styles.orders}>
          {orders.map((order) => (
            <OrderFeedCard
              key={order.number}
              orderFeedData={order}
              link={`${profileOrders}/:${order.number}`}
              state={'profileOrderFeed'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
