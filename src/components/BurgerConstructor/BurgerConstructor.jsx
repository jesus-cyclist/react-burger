import React from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'

import PropTypes from 'prop-types'

const BurgerConstructor = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

  if (!ingredientsApiData) {
    return <h2>Loading</h2>
  }

  return (
    <div className={style.column}>
      <BurgerConstructorList
        ingredientsApiData={ingredientsApiData}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  )
}

BurgerConstructor.propsTypes = {
  ingredientsApiData: PropTypes.oneOfType([
    PropTypes.string.isRequired,
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

export default BurgerConstructor
