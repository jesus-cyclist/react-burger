import React, { useState } from 'react'
import BurgerIngredientsStyle from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'

const BurgerIngredients = () => {
  return (
    <div className={BurgerIngredientsStyle.column}>
      <div className={BurgerIngredientsStyle.title}>
        <h2>Соберите бургер</h2>
      </div>
      <nav className={BurgerIngredientsStyle.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList />
      </nav>
    </div>
  )
}

export default BurgerIngredients
