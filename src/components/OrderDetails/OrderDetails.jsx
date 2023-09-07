import React, { useContext, useEffect, useState } from 'react'
import style from './OrderDetails.module.css'
import {
  CheckMarkIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { orderApiRequest } from '../../utils/orderApiRequest'
import { ErrorDataContext, ModalDataContext } from '../../context/appContext'

const OrderDetails = (props) => {
  const [orderData, setOrderData] = useState(null)
  const { setError } = useContext(ErrorDataContext)
  const { closeModal } = useContext(ModalDataContext)
  const { ingredientsList } = props

  useEffect(() => orderApiRequest(ingredientsList, setOrderData, setError), [])

  return (
    <div className={style.wrapper}>
      {orderData && (
        <>
          {' '}
          <button className={style.control}>
            <CloseIcon type={'primary'} onClick={closeModal} />
          </button>
          <div className={style.order}>
            <div className={style.main}>
              <div className={style.orderNumber}>
                <p className="text text_type_digits-large">
                  {orderData.order.number}
                </p>
              </div>
              <span className={style.orderNumberText}>
                идентификатор заказа
              </span>
              <div className={style.logoConfirm}>
                <div className={style.logo}>
                  <CheckMarkIcon type="primary" />
                  {/* надо искать свг для анимации или ее делать не надо? */}
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
      )}
    </div>
  )
}

OrderDetails.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default OrderDetails
