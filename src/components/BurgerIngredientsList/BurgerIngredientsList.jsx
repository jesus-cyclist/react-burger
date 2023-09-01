import React, { useEffect, useState } from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import { request } from '../../utils/request'
import PropTypes from 'prop-types'

const BurgerIngredientsList = (props) => {
  const [ingredientsList, setIngredientsList] = useState([])
  const { setModalData } = props

  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    request(url, ingredientsList, setIngredientsList)
  }, [])

  const title = ['Булки', 'Соусы', 'Начинки']

  return (
    <ul className={style.list}>
      {ingredientsList.length === 0 ? (
        <h2>loading</h2>
      ) : (
        title.map((item) => (
          <BurgerIngredientsSection
            key={item}
            title={item}
            ingredientsList={ingredientsList}
            setModalData={setModalData}
          />
        ))
      )}
    </ul>
  )
}

BurgerIngredientsList.propTypes = {
  setModalData: PropTypes.func.isRequired,
}

export default BurgerIngredientsList
