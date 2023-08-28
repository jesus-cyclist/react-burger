import React from 'react'
import style from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'

const BurgerIngredients = () => {
  return (
    <div className={style.column}>
      <div className={style.title}>
        <h2>Соберите бургер</h2>
      </div>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList />
      </nav>
    </div>
  )
}

export default BurgerIngredients
