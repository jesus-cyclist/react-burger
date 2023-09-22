import { ingredientPropType } from '../../utils/prop-types'
import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'

const IngredientDetails = (props) => {
  const { data } = props

  return (
    <>
      <div className={style.header}>
        <h2 className={style.title}>Детали ингредиента</h2>
      </div>
      <div className={style.ingredient}>
        <div className={style.ingredientImg}>
          <img src={data.image_large} alt={data.name} />
        </div>
        <h2 className={style.ingredientName}>{data.name}</h2>
      </div>
      <ul className={style.ingredientStructureList}>
        <li className={style.ingredientStructureItem}>
          <h3 className={style.structureTitle}>Калории,ккал</h3>
          <span className={style.structureValue}>{data.calories}</span>
        </li>
        <li className={style.ingredientStructureItem}>
          <h3 className={style.structureTitle}>Белки, г</h3>
          <span className={style.structureValue}>{data.proteins}</span>
        </li>
        <li className={style.ingredientStructureItem}>
          <h3 className={style.structureTitle}>Жиры, г</h3>
          <span className={style.structureValue}>{data.fat}</span>
        </li>
        <li className={style.ingredientStructureItem}>
          <h3 className={style.structureTitle}>Углеводы, г</h3>
          <span className={style.structureValue}>{data.carbohydrates}</span>
        </li>
      </ul>
    </>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape(ingredientPropType.isRequired).isRequired,
}

export default IngredientDetails
