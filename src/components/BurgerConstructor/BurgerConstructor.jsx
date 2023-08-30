import React, { useMemo } from 'react'
import style from './BurgerConstructor.module.css'
import order from '../../utils/order'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = () => {
  const bread = 'bun'
  const breadIdentification = useMemo(
    () => order.find((item) => item.type === bread),
    [order]
  )
  const ingredientsIdentification = useMemo(
    () => order.filter((item) => item.type !== bread),
    [order]
  )

  const totalAmount = useMemo(
    () => order.reduce((acc, item) => (acc += item.price), 0),
    [order]
  )

  return (
    <div className={style.column}>
      <BurgerConstructorItem
        text={`${breadIdentification.name}  (верх)`}
        type="top"
        isLocked={true}
        thumbnail={breadIdentification.image}
        price={breadIdentification.price}
        dragIcon={false}
      />
      <div className={style.ingredients}>
        {ingredientsIdentification.map((item, ind, arr) => (
          <BurgerConstructorItem
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            isLocked={false}
            last={ind === arr.length - 1 ? false : true}
          />
        ))}
      </div>

      <BurgerConstructorItem
        text={`${breadIdentification.name}  (низ)`}
        type="bottom"
        isLocked={true}
        thumbnail={breadIdentification.image}
        price={breadIdentification.price}
        dragIcon={false}
      />
      <div className={style.order}>
        <div className={style.total}>
          <span className={style.totalCost}>{totalAmount}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor
