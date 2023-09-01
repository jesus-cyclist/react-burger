import React from 'react'
import style from './OrderDetails.module.css'
import {
  CheckMarkIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

const OrderDetails = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.control}>
        <CloseIcon type={'primary'} />
      </div>
      <div className={style.order}>
        <div className={style.main}>
          <div className={style.orderNumber}>
            <p className="text text_type_digits-large">123456</p>
            {/* как шэдэу цифрам задать? */}
          </div>
          <span className={style.orderNumberText}>идентификатор заказа</span>
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
    </div>
  )
}

export default OrderDetails
