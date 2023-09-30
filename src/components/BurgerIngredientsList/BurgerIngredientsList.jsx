import React from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import { useAppDispatch } from '../../hooks/hooks'
import { SCROLL } from '../../services/actions/activeTab'

function scrollHandler() {
  const bun = document.getElementById('bun')
  const sauce = document.getElementById('sauce')
  const main = document.getElementById('main')
  const tabs = document.getElementById('tabs')

  const bunRect = bun.getBoundingClientRect()
  const sauceRect = sauce.getBoundingClientRect()
  const mainRect = main.getBoundingClientRect()
  const tabsRect = tabs.getBoundingClientRect()

  const bunDistance = bunRect.bottom - tabsRect.bottom
  const sauceDistance = sauceRect.bottom - tabsRect.bottom
  const mainDistance = mainRect.bottom - tabsRect.bottom

  return { bunDistance, sauceDistance, mainDistance }
}

const BurgerIngredientsList = () => {
  const dispatch = useAppDispatch()
  const title = ['Булки', 'Соусы', 'Начинки']

  return (
    <ul
      className={style.list}
      onScroll={(e) => dispatch({ type: SCROLL, distance: scrollHandler() })}
    >
      {title.map((item) => (
        <BurgerIngredientsSection key={item} title={item} />
      ))}
    </ul>
  )
}

export default BurgerIngredientsList
