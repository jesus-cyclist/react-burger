import React from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import PropTypes from 'prop-types'

const BurgerIngredientsSection = (props) => {
  const { title, ingredientsApiData, openModal, closeModal } = props

  const list = { Булки: 'bun', Соусы: 'sauce', Начинки: 'main' }
  const sortedData = () => {
    return ingredientsApiData.filter((item) => item.type === list[title])
  }

  return (
    <li className={style.section}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {sortedData().map((item) => (
          <BurgerIngredientsItem
            key={item._id}
            item={item}
            openModal={openModal}
            closeModal={closeModal}
          />
        ))}
      </div>
    </li>
  )
}

BurgerIngredientsSection.propTypes = {
  ingredientsApiData: PropTypes.arrayOf(
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
  ).isRequired,
  title: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default BurgerIngredientsSection
