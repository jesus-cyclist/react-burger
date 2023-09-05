import React from 'react'
import style from './BurgerIngredientsList.module.css'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import PropTypes from 'prop-types'

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
  ingredientsApiData: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      })
    ),
  ]).isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerIngredientsList
