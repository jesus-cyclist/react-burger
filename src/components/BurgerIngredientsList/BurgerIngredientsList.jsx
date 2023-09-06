import React from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import PropTypes from 'prop-types'
import { ingredientPropType } from '../../utils/prop-types'

const BurgerIngredientsList = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

  const title = ['Булки', 'Соусы', 'Начинки']

  return (
    <ul className={style.list}>
      {title.map((item) => (
        <BurgerIngredientsSection
          key={item}
          title={item}
          ingredientsApiData={ingredientsApiData}
          openModal={openModal}
          closeModal={closeModal}
        />
      ))}
    </ul>
  )
}

BurgerIngredientsList.propTypes = {
  ingredientsApiData: PropTypes.arrayOf(ingredientPropType.isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerIngredientsList
