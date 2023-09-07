import React, { useContext, useMemo, useReducer } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {
  IngredientsDataContext,
  ModalDataContext,
} from '../../context/appContext'

const totalAmountReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      const bread = 'bun'
      const breadId = action.payload.find((item) => item.type === bread)

      const fillingId = action.payload.filter((item) => item.type !== bread)

      const totalAmount = action.payload.reduce(
        (acc, item) => (acc += item.price),
        0
      )

      const ingredientsList = action.payload.reduce((acc, item) => {
        acc.push(item._id)
        return acc
      }, [])

      return {
        totalAmount: totalAmount,
        filling: fillingId,
        bread: breadId,
        downloaded: true,
        ingredientsList: ingredientsList,
      }
    default:
      return state
  }
}

const BurgerConstructorList = () => {
  const { ingredientsApiData } = useContext(IngredientsDataContext)
  const { openModal, closeModal } = useContext(ModalDataContext)

  const [listData, dispatchTotalAmount] = useReducer(totalAmountReducer, {
    downloaded: false,
    totalAmount: 0,
    bread: null,
    filling: null,
    ingredientsList: null,
  })

  useMemo(
    () =>
      dispatchTotalAmount({
        type: 'update',
        payload: ingredientsApiData,
      }),
    [ingredientsApiData]
  )

  return (
    <div className={style.list}>
      {listData.downloaded && (
        <>
          <BurgerConstructorItem
            text={`${listData.bread.name}  (верх)`}
            type="top"
            thumbnail={listData.bread.image}
            price={listData.bread.price}
            dragIcon={false}
            onClick={() =>
              openModal(
                <IngredientDetails
                  data={listData.bread}
                  closeModal={closeModal}
                />
              )
            }
          />
          <div className={style.ingredients}>
            {listData.filling.map((item, ind, arr) => (
              <BurgerConstructorItem
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
                last={ind === arr.length - 1 ? false : true}
                onClick={() =>
                  openModal(
                    <IngredientDetails data={item} closeModal={closeModal} />
                  )
                }
              />
            ))}
          </div>
          <BurgerConstructorItem
            text={`${listData.bread.name}  (низ)`}
            type="bottom"
            thumbnail={listData.bread.image}
            price={listData.bread.price}
            dragIcon={false}
            onClick={() =>
              openModal(
                <IngredientDetails
                  data={listData.bread}
                  closeModal={closeModal}
                />
              )
            }
          />
          <div className={style.order}>
            <div className={style.total}>
              <span className={style.totalCost}>{listData.totalAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() =>
                openModal(
                  <OrderDetails ingredientsList={listData.ingredientsList} />
                )
              }
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default BurgerConstructorList
