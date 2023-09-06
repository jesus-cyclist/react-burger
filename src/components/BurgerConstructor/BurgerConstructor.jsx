import React from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'

import PropTypes from 'prop-types'
import { ingredientPropType } from '../../utils/prop-types'

const BurgerConstructor = (props) => {
  const { ingredientsApiData, openModal, closeModal } = props

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
  ingredientsApiData: PropTypes.arrayOf(ingredientPropType.isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerConstructor
