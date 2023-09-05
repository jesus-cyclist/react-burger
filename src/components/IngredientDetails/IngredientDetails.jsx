import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'

const IngredientDetails = (props) => {
  const { data, closeModal } = props
  return (
    <div className={style.block}>
      <div className={style.header}>
        <h2 className={style.title}>Детали ингредиента</h2>
        <button>
          <CloseIcon type={'primary'} onClick={closeModal} />
        </button>
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
    </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default IngredientDetails
