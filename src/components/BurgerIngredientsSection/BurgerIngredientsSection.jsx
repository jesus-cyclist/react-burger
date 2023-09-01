import React, { useEffect } from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import PropTypes from 'prop-types'

const BurgerIngredientsSection = (props) => {
  const { setModalData, title, ingredientsList } = props
  const list = { Булки: 'bun', Соусы: 'sauce', Начинки: 'main' }
  const sortedData = () => {
    return ingredientsList.filter((item) => item.type === list[title])
  }

  return (
    <li className={style.section}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {sortedData().map((item) => (
          <BurgerIngredientsItem
            key={item._id}
            item={item}
            setModalData={setModalData}
          />
        ))}
      </div>
    </li>
  )
}

BurgerIngredientsSection.propTypes = {
  ingredientsList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setModalData: PropTypes.func.isRequired,
}

export default BurgerIngredientsSection
