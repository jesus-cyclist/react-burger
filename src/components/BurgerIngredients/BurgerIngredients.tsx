import React, { FC } from 'react'
import style from './BurgerIngredients.module.css'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'

const BurgerIngredients = (): JSX.Element => {
  return (
    <div className={style.column}>
      <h2 className={style.title}>Соберите бургер</h2>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList />
      </nav>
    </div>
  )
}

export default BurgerIngredients
