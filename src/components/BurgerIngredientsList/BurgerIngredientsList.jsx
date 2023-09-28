import React, { useState } from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { SCROLL } from '../../services/actions/activeTab'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

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
  const [modalIngredient, setModalIngredient] = useState(null)
  const { isModalActive, modalType } = useAppSelector(
    (state) => state.rootReducer.modal
  )
  const dispatch = useAppDispatch()
  const title = ['Булки', 'Соусы', 'Начинки']

  return (
    <ul
      className={style.list}
      onScroll={(e) => dispatch({ type: SCROLL, distance: scrollHandler() })}
    >
      {title.map((item) => (
        <BurgerIngredientsSection
          key={item}
          title={item}
          setModalIngredient={setModalIngredient}
        />
      ))}
      {isModalActive && modalType === 'ingredient' && (
        <Modal>
          <IngredientDetails data={modalIngredient} />
        </Modal>
      )}
    </ul>
  )
}

export default BurgerIngredientsList
