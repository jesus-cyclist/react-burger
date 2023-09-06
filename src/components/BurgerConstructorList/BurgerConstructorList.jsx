import React, { useMemo } from 'react'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorList.module.css'
import PropTypes from 'prop-types'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { ingredientPropType } from '../../utils/prop-types'

const BurgerConstructorList = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

  const bread = 'bun'
  const breadIdentification = useMemo(
    () => ingredientsApiData.find((item) => item.type === bread),
    [ingredientsApiData]
  )

  const ingredientsIdentification = useMemo(
    () => ingredientsApiData.filter((item) => item.type !== bread),
    [ingredientsApiData]
  )

  const totalAmount = useMemo(
    () => ingredientsApiData.reduce((acc, item) => (acc += item.price), 0),
    [ingredientsApiData]
  )

  return (
    <div className={style.list}>
      <BurgerConstructorItem
        text={`${breadIdentification.name}  (верх)`}
        type="top"
        thumbnail={breadIdentification.image}
        price={breadIdentification.price}
        dragIcon={false}
        onClick={() =>
          openModal(
            <IngredientDetails
              data={breadIdentification}
              closeModal={closeModal}
            />
          )
        }
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
            onClick={() =>
              openModal(
                <IngredientDetails data={item} closeModal={closeModal} />
              )
            }
          />
        ))}
      </div>
      <BurgerConstructorItem
        text={`${breadIdentification.name}  (низ)`}
        type="bottom"
        thumbnail={breadIdentification.image}
        price={breadIdentification.price}
        dragIcon={false}
        onClick={() =>
          openModal(
            <IngredientDetails
              data={breadIdentification}
              closeModal={closeModal}
            />
          )
        }
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
          onClick={() => openModal(<OrderDetails closeModal={closeModal} />)}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructorList.propTypes = {
  ingredientsApiData: PropTypes.arrayOf(ingredientPropType.isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerConstructorList
