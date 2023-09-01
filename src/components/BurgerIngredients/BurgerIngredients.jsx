import React from 'react'
import style from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'
import PropTypes from 'prop-types'

const BurgerIngredients = (props) => {
  const { setModalData } = props
  return (
    <div className={style.column}>
      <div className={style.title}>
        <h2>Соберите бургер</h2>
      </div>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList setModalData={setModalData} />
      </nav>
    </div>
  )
}

BurgerIngredients.propTypes = {
  setModalData: PropTypes.func.isRequired,
}

export default BurgerIngredients
