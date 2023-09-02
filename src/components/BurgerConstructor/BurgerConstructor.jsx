import React, { useEffect, useState } from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'

import PropTypes from 'prop-types'

const BurgerConstructor = (props) => {
  const { setModalData, ingredientsApiData, setClickedElement } = props

  return (
    <div className={style.column}>
      <BurgerConstructorList
        ingredientsApiData={ingredientsApiData}
        setModalData={setModalData}
        setClickedElement={setClickedElement}
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
  setClickedElement: PropTypes.func.isRequired,
}

export default BurgerConstructor
