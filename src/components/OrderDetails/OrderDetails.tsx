import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchOrderData } from '../../services/reducers/order'
import {
  selectBun,
  selectFilling,
} from '../../services/selectors/constructorSelectors'
import { selectOrder } from '../../services/selectors/orderSelectors'
import { accessToken } from '../../utils/token'
import { TIngredient } from '../../utils/types'
import style from './OrderDetails.module.css'

const OrderDetails = (): JSX.Element => {
  const filling = useSelector(selectFilling)
  const bun = useSelector(selectBun)
  const data = useSelector(selectOrder)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (filling || bun) {
      const allIngredientsId: string[] = []
      filling.forEach((ingredient: TIngredient) =>
        allIngredientsId.push(ingredient._id)
      )
      {
        bun._id && allIngredientsId.push(bun._id)
        allIngredientsId.push(bun._id)
      }

      const token = Cookies.get(accessToken)
      const requestData = {
        body: { ingredients: allIngredientsId },
        token: { accessToken: token },
      }
      console.log(allIngredientsId)

      dispatch(fetchOrderData(requestData))
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
