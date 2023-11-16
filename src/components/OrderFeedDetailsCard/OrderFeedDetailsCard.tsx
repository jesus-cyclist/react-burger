import React from 'react'
import { TIngredient } from '../../utils/types'
import styles from './OrderFeedDetailsCard.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TOrderFeedDetailsCard = {
  ingredients: TIngredient
}

const OrderFeedDetailsCard = (props: TOrderFeedDetailsCard) => {
  const { ingredients } = props
  return (
    <div className={styles.container}>
      <div className={styles.ingredientsImage}>
        <img src={ingredients.image_mobile} alt={ingredients.name} />
      </div>

      <span className={styles.ingredientsName}>{ingredients.name}</span>
      <div className={styles.ingredientsCost}>
        <span>{`${ingredients.count} x ${ingredients.price}`}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default OrderFeedDetailsCard
