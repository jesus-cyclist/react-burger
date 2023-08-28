import React from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'

const BurgerIngredientsList = () => {
  const list = ['Булки', 'Соусы', 'Начинки']

  return (
    <ul className="">
      {list.map((item) => (
        <BurgerIngredientsSection key={item} title={item} />
      ))}
    </ul>
  )
}

export default BurgerIngredientsList
