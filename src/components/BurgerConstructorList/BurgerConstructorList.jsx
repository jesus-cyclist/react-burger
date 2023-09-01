import React, { useMemo } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import PropTypes from 'prop-types'

const BurgerConstructorList = (props) => {
  const { order, setModalData } = props

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
    <div className={style.list}>
      <BurgerConstructorItem
        text={`${breadIdentification.name}  (верх)`}
        type="top"
        isLocked={true}
        thumbnail={breadIdentification.image}
        price={breadIdentification.price}
        dragIcon={false}
        onClick={() => setModalData(breadIdentification)}
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
            onClick={() => setModalData(item)}
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
        onClick={() => setModalData(breadIdentification)}
      />
      <div className={style.order}>
        <div className={style.total}>
          <span className={style.totalCost}>{totalAmount}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          onClick={() => setModalData('order')}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructorList.propTypes = {
  order: PropTypes.array.isRequired,
  setModalData: PropTypes.func.isRequired,
}

export default BurgerConstructorList
