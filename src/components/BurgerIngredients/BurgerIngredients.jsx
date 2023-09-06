import React from 'react'
import style from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'
import PropTypes from 'prop-types'
import { ingredientPropType } from '../../utils/prop-types'

const BurgerIngredients = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

  return (
    <div className={style.column}>
      <div className={style.title}>
        <h2>Соберите бургер</h2>
      </div>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList
          ingredientsApiData={ingredientsApiData}
          openModal={openModal}
          closeModal={closeModal}
        />
      </nav>
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredientsApiData: PropTypes.arrayOf(ingredientPropType.isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerIngredients
